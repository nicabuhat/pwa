// public/service-worker.js

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-pwa-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/*.css',
        '/js/*.css',
        '/img/*/*.*'
        // Add other assets to cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
