/* service-worker.js — caches the app shell so, once loaded from a URL,
   the trainer keeps working with no internet connection at all.
   Bump CACHE_NAME whenever app files change, so returning visitors get updates.
*/
const CACHE_NAME = 'english-trainer-v1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/db.js',
  './js/audio.js',
  './js/data.js',
  './js/exercises.js',
  './js/app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Cache-first: serve from cache when available, otherwise fetch and cache it.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
