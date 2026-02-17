const CACHE_NAME = "pattern-pantry-v1";
const STATIC_ASSETS = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Ignore failures for optional URLs (e.g. if manifest not found during dev)
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cached) => {
        const fetchAndCache = () =>
          fetch(request).then((response) => {
            if (response.ok && request.method === "GET") {
              const clone = response.clone();
              cache.put(request, clone);
            }
            return response;
          });

        if (request.mode === "navigate") {
          return fetchAndCache().catch(() => cached || caches.match("/"));
        }

        if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
          return cached || fetchAndCache();
        }

        return cached || fetchAndCache();
      });
    })
  );
});
