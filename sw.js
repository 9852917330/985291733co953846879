const CACHE_NAME = 'millionaire-cache-v14-force-new-icon';
const APP_SHELL = [
  "./",
  "./index.html",
  "./millionaire.html",
  "./manifest.webmanifest",
  "./millionaire-icon-192-v14.png",
  "./millionaire-icon-512-v14.png",
  "./millionaire-apple-touch-icon-v14.png",
  "./millionaire-og-image-v14.png",
  "./millionaire-thumbnail-v14.png",
  "./millionaire-favicon-v14.ico",
  "./favicon.ico",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./og-image.png",
  "./thumbnail.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(match => match || caches.match("./millionaire.html") || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
