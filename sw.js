const CACHE = 'noc-assistant-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/bot.png',
  './sounds/bubble-received.mp3',
  './sounds/bubble-send.mp3'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});