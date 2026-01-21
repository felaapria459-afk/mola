const CACHE_NAME = "pwa-mobil-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./mola.html",
        "./style.css",
        "./script.js",
        "./script-mola.js",
        "./datamobil.csv",
        "./datamobilmola.csv"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
