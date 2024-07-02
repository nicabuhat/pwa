// src/service-worker.js

// Import Workbox library
import { precacheAndRoute } from 'workbox-precaching';

// Precache files specified by the Workbox webpack plugin
precacheAndRoute(self.__WB_MANIFEST);

// Custom caching logic (optional)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-pwa-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/*.css',
        '/js/*.css',
        '/img/*/*.*',
        '/favicon.ico'
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
