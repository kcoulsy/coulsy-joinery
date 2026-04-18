// Self-unregistering service worker.
// Existing visitors' browsers will install this version, which then removes
// itself and clears any caches the previous SW left behind. Once all existing
// clients have hit this, the SW is gone and the registration in
// PerformanceOptimiser.astro can be removed in a future release.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async () => {
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window" });
    clients.forEach((client) => {
      if ("navigate" in client) client.navigate(client.url);
    });
  } catch (_) {}
});
