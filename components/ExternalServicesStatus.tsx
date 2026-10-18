"use client";

import { useEffect, useState } from "react";

export function ExternalServicesStatus() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return offline ? <p className="contact-offline-note" role="status">Você está sem internet. WhatsApp, YouTube e Google Maps precisam de conexão.</p> : null;
}
