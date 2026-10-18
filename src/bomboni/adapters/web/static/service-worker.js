const CACHE = 'bomboni-shell-v31';
const SHELL = ['/', '/styles.css?v=v31', '/app.js?v=v31', '/community.js?v=v31', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];
self.addEventListener('install', event => event.waitUntil(Promise.all([
  caches.open(CACHE).then(cache => cache.addAll(SHELL)),
  self.skipWaiting()
])));
self.addEventListener('activate', event => event.waitUntil(Promise.all([
  caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))),
  self.clients.claim()
])));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request).catch(() => new Response(JSON.stringify({error:'offline'}), {status:503,headers:{'Content-Type':'application/json'}})));
    return;
  }
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && event.request.method === 'GET') caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || Promise.reject(new Error('offline')))));
});
