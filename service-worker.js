// Retires the service worker that older React builds of this site registered.
// Browsers that still run that worker fetch this file, install it, clear the old caches,
// unregister, and reload open tabs so visitors see the current site. New visitors never run it.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(function (c) { c.navigate(c.url); });
  })());
});
