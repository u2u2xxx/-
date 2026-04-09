const CACHE_NAME = "icebreaker-pwa-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./app.webmanifest",
  "./assets/cat-neutral.gif",
  "./assets/cat-soft.gif",
  "./assets/cat-bold.gif",
  "./assets/minion-01.gif",
  "./assets/minion-02.webp",
  "./assets/cinnamoroll-01.gif",
  "./assets/cinnamoroll-02.gif",
  "./assets/dayanji-01.gif",
  "./assets/dayanji-02.webp",
  "./assets/kuromi-01.gif",
  "./assets/kuromi-02.gif",
  "./assets/mickey-01.gif",
  "./assets/mickey-02.webp",
  "./assets/labubu-01.gif",
  "./assets/labubu-02.gif"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
