"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const items = document.querySelectorAll<HTMLElement>(
      ".benefits-inner > div, .content-section .section-intro, .video-card, .studio-visual, .testimonials-empty, .testimonials-grid blockquote, .quote-form"
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -45px 0px", threshold: 0.06 });

    items.forEach((item) => {
      item.classList.add("reveal-item");
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
