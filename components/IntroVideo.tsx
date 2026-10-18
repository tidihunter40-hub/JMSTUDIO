"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./intro-video.css";

const SESSION_KEY = "jmstudio:intro-seen:v4";
const ART_DURATION_MS = 1200;
const FADE_MS = 350;
const VIDEO_SOURCES = {
  desktop: { mp4: "/videos/jmstudio-intro-optimized.mp4", webm: "/videos/jmstudio-intro-desktop-vp9.webm" },
  portrait: { mp4: "/videos/jmstudio-intro-mobile-h264.mp4", webm: "/videos/jmstudio-intro-mobile-vp9.webm" },
};

type Phase = "checking" | "playing" | "waiting-art" | "artwork" | "exiting" | "exiting-art" | "done";

export function IntroVideo() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [portrait, setPortrait] = useState(false);
  const [useVp9, setUseVp9] = useState(false);
  const [mobileFinale, setMobileFinale] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const artRef = useRef<HTMLImageElement>(null);
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

  const showArtwork = useCallback(() => {
    videoRef.current?.pause();
    setPhase(current => {
      if (current !== "playing") return current;
      return artRef.current?.complete && artRef.current.naturalWidth ? "artwork" : "waiting-art";
    });
  }, []);

  useEffect(() => {
    setUseVp9(document.createElement("video").canPlayType('video/webm; codecs="vp9"') !== "");
    const media = window.matchMedia("(max-aspect-ratio: 3/4)");
    const update = () => {
      if (videoRef.current && videoRef.current.currentTime) resumeAt.current = videoRef.current.currentTime;
      setPortrait(media.matches);
      setMobileFinale(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const introWindow = window as Window & { __jmIntroFallback?: number; __jmIntroSkipped?: boolean; __jmIntroReady?: boolean };
    introWindow.__jmIntroReady = true;
    const fallback = introWindow.__jmIntroFallback;
    if (fallback) window.clearTimeout(fallback);
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
    if (video) {
      video.muted = true;
      video.play().catch(finish);
    }
    return () => {
      document.documentElement.style.overflow = priorOverflow;
      if (startupTimer.current) clearTimeout(startupTimer.current);
      if (stallTimer.current) clearTimeout(stallTimer.current);
      clearTimeout(safetyTimer);
    };
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "waiting-art") return;
    const timeout = setTimeout(finish, 1500);
    return () => clearTimeout(timeout);
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "artwork") return;
    const timeout = setTimeout(() => setPhase("exiting-art"), ART_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting" && phase !== "exiting-art") return;
    const fade = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 240 : FADE_MS;
    const timeout = setTimeout(() => {
      document.documentElement.removeAttribute("data-jm-intro");
      setPhase("done");
    }, fade);
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

  const variant = portrait ? VIDEO_SOURCES.portrait : VIDEO_SOURCES.desktop;
  const videoSrc = useVp9 ? variant.webm : variant.mp4;

  return (
    <div className={`jm-intro jm-intro--${phase}`} role="dialog" aria-modal="true" aria-label="Apresentação do JMSTUDIO">
      {phase !== "checking" && (
        <video
          ref={videoRef}
          className="jm-intro__video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={portrait ? "/images/intro-poster-portrait.jpg" : "/images/intro-poster-desktop.jpg"}
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
          onTimeUpdate={() => {
            if (portrait && videoRef.current && videoRef.current.currentTime >= 8.8) setMobileFinale(true);
          }}
          onEnded={showArtwork}
          onError={finish}
          aria-label="Vídeo de apresentação do JMSTUDIO"
        />
      )}
      {portrait && mobileFinale && phase === "playing" && (
        <div className="jm-intro__mobile-finale" aria-hidden="true">
          <img src="/images/logo-jmstudio.webp" alt="" />
        </div>
      )}
      {phase !== "checking" && (
        <picture className="jm-intro__art">
          <source media="(max-aspect-ratio: 4/5)" srcSet="/images/intro-juditrombone-mobile.webp" />
          <source media="(max-aspect-ratio: 3/2)" srcSet="/images/intro-juditrombone-tablet.webp" />
          <img
            ref={artRef}
            src="/images/intro-juditrombone-desktop.webp"
            alt="Juditrombone tocando trombone no estúdio neon, com o logo JMSTUDIO e @juditrombone"
            width="1672"
            height="941"
            loading="eager"
            fetchPriority="low"
            onLoad={() => { if (phase === "waiting-art") setPhase("artwork"); }}
            onError={() => { if (phase === "waiting-art") finish(); }}
          />
        </picture>
      )}
      <div className="jm-intro__flash" aria-hidden="true" />
      <button className="jm-intro__skip" type="button" onClick={finish}>
        Pular introdução <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
