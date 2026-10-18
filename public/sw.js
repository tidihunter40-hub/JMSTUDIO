const CACHE = "jmstudio-v5";
const CORE = [
  "/", "/servicos", "/contato", "/offline", "/images/simbolo-jmstudio.png", "/images/studio-hero.webp", "/icons/icon-192.png",
  "/images/services-studio.webp", "/images/services-mascot.png", "/images/contact-hero-studio.webp",
  "/images/contact-sections-studio.webp", "/images/contact-final-studio.webp",
  "/images/service-recording.webp", "/images/service-mixing.webp", "/images/service-mastering.webp",
  "/images/service-production.webp", "/images/service-spots.webp", "/images/service-audiovisual.webp",
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim(),
  ]));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(async () => (await caches.match(request)) || (await caches.match("/offline")) || Response.error()));
    return;
  }
  if (/\.(?:png|webp|svg|ico|woff2?|js|css)$/i.test(new URL(request.url).pathname)) {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); }
      return response;
    }).catch(async () => (await caches.match(request)) || Response.error()));
  }
});
