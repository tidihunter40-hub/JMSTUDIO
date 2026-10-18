"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./intro-video.css";

const SESSION_KEY = "jmstudio:intro-seen:v2";
const FADE_MS = 900;
const REDUCED_FADE_MS = 520;

type Phase = "checking" | "playing" | "exiting" | "done";

function syncBackdrop(backdrop: HTMLVideoElement | null, time: number) {
  if (!backdrop || backdrop.readyState === 0 || Math.abs(backdrop.currentTime - time) <= .3) return;
  try {
    backdrop.currentTime = time;
  } catch {
    // Some mobile browsers do not allow seeking before enough data is loaded.
  }
}

export function IntroVideo({ portraitSrc }: { portraitSrc?: string }) {
  const [phase, setPhase] = useState<Phase>("checking");
  const [portrait, setPortrait] = useState(false);
  const currentOrientation = useRef<boolean | null>(null);
  const resumeAt = useRef(0);
  const initialized = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const startupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    setPhase((current) => current === "playing" ? "exiting" : current);
    videoRef.current?.pause();
    backdropRef.current?.pause();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-aspect-ratio: 3/4)");
    const update = () => {
      if (currentOrientation.current === media.matches) return;
      if (currentOrientation.current !== null) resumeAt.current = videoRef.current?.currentTime || 0;
      currentOrientation.current = media.matches;
      setPortrait(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let seen = false;
    const replay = new URLSearchParams(window.location.search).get("ver-intro") === "1";
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private browsing can disable storage; the intro can still run.
    }

    if ((seen && !replay) || !navigator.onLine) {
      document.documentElement.removeAttribute("data-jm-intro");
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Playback and the escape path still work without storage.
    }
    document.documentElement.setAttribute("data-jm-intro", "show");
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const priorOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    startupTimer.current = setTimeout(finish, 8000);
    safetyTimer.current = setTimeout(finish, 25000);

    const video = videoRef.current;
    const backdrop = backdropRef.current;
    if (backdrop) {
      backdrop.muted = true;
      syncBackdrop(backdrop, video?.currentTime || 0);
      backdrop.play().catch(() => {});
    }
    if (video) {
      video.muted = true;
      video.play().catch(finish);
    }

    return () => {
      document.documentElement.style.overflow = priorOverflow;
      if (startupTimer.current) clearTimeout(startupTimer.current);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
    };
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "playing" || !portrait) return;
    const backdrop = backdropRef.current;
    if (!backdrop) return;
    syncBackdrop(backdrop, videoRef.current?.currentTime || 0);
    backdrop.play().catch(() => {});
  }, [phase, portrait]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const fadeDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? REDUCED_FADE_MS
      : FADE_MS;
    exitTimer.current = setTimeout(() => {
      document.documentElement.removeAttribute("data-jm-intro");
      setPhase("done");
    }, fadeDuration);
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [phase]);

  useEffect(() => {
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    return () => {
      // Strict Mode replays effects in development; let its next setup cancel this.
      unmountTimer.current = setTimeout(() => {
        document.documentElement.removeAttribute("data-jm-intro");
      }, 0);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`jm-intro${phase === "exiting" ? " jm-intro--exiting" : ""}${portraitSrc ? " jm-intro--has-portrait" : ""}`} role="dialog" aria-modal="true" aria-label="Apresentação do JMSTUDIO">
      <div className="jm-intro__glow" aria-hidden="true" />
      {phase !== "checking" && portrait && !portraitSrc && (
        <video
          ref={backdropRef}
          className="jm-intro__backdrop"
          autoPlay
          muted
          playsInline
          preload="auto"
          loop
          poster="/images/studio-hero-neon.webp"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={() => syncBackdrop(backdropRef.current, videoRef.current?.currentTime || 0)}
        >
          <source src="/videos/jmstudio-intro.mp4" type="video/mp4" />
        </video>
      )}
      {phase !== "checking" && (
        <video
          ref={videoRef}
          className="jm-intro__video"
          src={portrait && portraitSrc ? portraitSrc : "/videos/jmstudio-intro.mp4"}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/images/simbolo-jmstudio.png"
          onLoadedMetadata={() => {
            if (resumeAt.current && videoRef.current) {
              try { videoRef.current.currentTime = resumeAt.current; } catch {}
              resumeAt.current = 0;
            }
          }}
          onCanPlay={() => {
            if (phase === "playing") videoRef.current?.play().catch(finish);
          }}
          onPlaying={() => {
            if (startupTimer.current) clearTimeout(startupTimer.current);
            syncBackdrop(backdropRef.current, videoRef.current?.currentTime || 0);
          }}
          onEnded={finish}
          onError={finish}
          aria-label="Vídeo de apresentação do JMSTUDIO"
        />
      )}
      <button className="jm-intro__skip" type="button" onClick={finish}>
        Pular introdução <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
