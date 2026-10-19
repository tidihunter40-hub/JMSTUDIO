"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./intro-video.css";

const SESSION_KEY = "jmstudio:intro-seen:v5";
const PASSAGE_MS = 650;
const SKIP_FADE_MS = 240;
const VIDEO_SOURCES = {
  desktop: { mp4: "/videos/jmstudio-intro-2026-desktop.mp4", webm: "/videos/jmstudio-intro-2026-desktop.webm", poster: "/images/intro-2026-desktop-poster.webp" },
  tablet: { mp4: "/videos/jmstudio-intro-2026-tablet.mp4", webm: "/videos/jmstudio-intro-2026-tablet.webm", poster: "/images/intro-2026-tablet-poster.webp" },
  tabletPortrait: { mp4: "/videos/jmstudio-intro-2026-tablet-portrait.mp4", webm: "/videos/jmstudio-intro-2026-tablet-portrait.webm", poster: "/images/intro-2026-tablet-portrait-poster.webp" },
  mobile: { mp4: "/videos/jmstudio-intro-2026-mobile.mp4", webm: "/videos/jmstudio-intro-2026-mobile.webm", poster: "/images/intro-2026-mobile-poster.webp" },
};

type Phase = "checking" | "playing" | "finishing" | "exiting" | "done";

function currentVariant() {
  if (window.matchMedia("(max-aspect-ratio: 7/10)").matches) return VIDEO_SOURCES.mobile;
  if (window.matchMedia("(max-aspect-ratio: 1/1)").matches) return VIDEO_SOURCES.tabletPortrait;
  if (window.matchMedia("(max-aspect-ratio: 3/2)").matches) return VIDEO_SOURCES.tablet;
  return VIDEO_SOURCES.desktop;
}

export function IntroVideo() {
  const [phase, setPhase] = useState<Phase>("checking");
  const videoRef = useRef<HTMLVideoElement>(null);
  const resumeAt = useRef(0);
  const initialized = useRef(false);
  const canceled = useRef(false);
  const startupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stallTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    canceled.current = true;
    videoRef.current?.pause();
    setPhase(current => current === "done" ? current : "exiting");
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const introWindow = window as Window & { __jmIntroFallback?: number; __jmIntroSkipped?: boolean; __jmIntroReady?: boolean };
    introWindow.__jmIntroReady = true;
    if (introWindow.__jmIntroFallback) window.clearTimeout(introWindow.__jmIntroFallback);
    if (canceled.current || introWindow.__jmIntroSkipped) {
      document.documentElement.removeAttribute("data-jm-intro");
      setPhase("done");
      return;
    }

    const replay = new URLSearchParams(window.location.search).get("ver-intro") === "1";
    let seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch {}
    if ((seen && !replay) || !navigator.onLine) {
      document.documentElement.removeAttribute("data-jm-intro");
      setPhase("done");
      return;
    }

    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    document.documentElement.setAttribute("data-jm-intro", "show");
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const priorOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    startupTimer.current = setTimeout(finish, 8000);
    const safetyTimer = setTimeout(finish, 20000);
    const video = videoRef.current;
    const selectSource = () => {
      if (!video) return;
      const variant = currentVariant();
      const source = video.canPlayType('video/webm; codecs="vp9"') ? variant.webm : variant.mp4;
      video.poster = variant.poster;
      if (video.getAttribute("src") === source) return;
      resumeAt.current = video.currentTime;
      video.src = source;
      video.play().catch(finish);
    };
    selectSource();
    if (video) {
      video.muted = true;
      video.play().then(() => {
        if (startupTimer.current) clearTimeout(startupTimer.current);
      }).catch(finish);
    }
    window.addEventListener("resize", selectSource);
    return () => {
      document.documentElement.style.overflow = priorOverflow;
      window.removeEventListener("resize", selectSource);
      if (startupTimer.current) clearTimeout(startupTimer.current);
      if (stallTimer.current) clearTimeout(stallTimer.current);
      clearTimeout(safetyTimer);
    };
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "finishing" && phase !== "exiting") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 160 : phase === "finishing" ? PASSAGE_MS : SKIP_FADE_MS;
    const timeout = setTimeout(() => {
      document.documentElement.removeAttribute("data-jm-intro");
      setPhase("done");
    }, duration);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    return () => {
      // Strict Mode replays effects in development; let its next setup cancel this.
      unmountTimer.current = setTimeout(() => document.documentElement.removeAttribute("data-jm-intro"), 0);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`jm-intro jm-intro--${phase}`} role="dialog" aria-modal="true" aria-label="Apresentação do JMSTUDIO">
      <video
        ref={videoRef}
        className="jm-intro__video"
        suppressHydrationWarning
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/intro-2026-desktop-poster.webp"
        onLoadedMetadata={() => {
          if (!resumeAt.current || !videoRef.current) return;
          try { videoRef.current.currentTime = resumeAt.current; } catch {}
          resumeAt.current = 0;
        }}
        onCanPlay={() => {
          if (phase === "playing") videoRef.current?.play().catch(finish);
        }}
        onPlaying={() => {
          if (startupTimer.current) clearTimeout(startupTimer.current);
          if (stallTimer.current) clearTimeout(stallTimer.current);
        }}
        onWaiting={() => {
          if (stallTimer.current) clearTimeout(stallTimer.current);
          stallTimer.current = setTimeout(finish, 4000);
        }}
        onEnded={() => setPhase("finishing")}
        onError={finish}
        aria-label="Vídeo de apresentação do JMSTUDIO"
      />
      <div className="jm-intro__passage" aria-hidden="true" />
      <button className="jm-intro__skip" type="button" onClick={finish}>
        Pular introdução <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
