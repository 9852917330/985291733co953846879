const CACHE_NAME = 'millionaire-cache-v13';
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./btc-icon-192-v13.png",
  "./btc-icon-512-v13.png",
  "./btc-apple-touch-icon-v13.png",
  "./btc-og-image-v13.png",
  "./btc-thumbnail-v13.png",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./og-image.png",
  "./thumbnail.png",
  "./btc-icon-192-v11.png",
  "./btc-icon-512-v11.png",
  "./btc-apple-touch-icon-v11.png",
  "./btc-og-image-v11.png",
  "./btc-thumbnail-v11.png"
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
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
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
