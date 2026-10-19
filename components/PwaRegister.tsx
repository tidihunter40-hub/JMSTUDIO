"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (!document.documentElement.hasAttribute("data-jm-intro")) {
      register();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!document.documentElement.hasAttribute("data-jm-intro")) {
        observer.disconnect();
        register();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-jm-intro"] });
    return () => observer.disconnect();
  }, []);
  return null;
}
