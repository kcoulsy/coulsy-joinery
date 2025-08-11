// Service Worker for Coulsy Joinery - Enhanced Version
const CACHE_NAME = 'coulsy-joinery-v2';
const STATIC_CACHE = 'coulsy-joinery-static-v2';
const DYNAMIC_CACHE = 'coulsy-joinery-dynamic-v2';

// Static assets to cache immediately
const STATIC_URLS = [
  '/',
  '/about',
  '/contact',
  '/joinery-services',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/site.webmanifest'
];

// Dynamic assets to cache on demand
const DYNAMIC_URLS = [
  '/joinery-services/kitchen-installers',
  '/joinery-services/bespoke-joinery',
  '/joinery-services/garden-offices',
  '/joinery-services/heritage-restoration-joinery',
  '/joinery-services/garden-rooms',
  '/joinery-services/door-hanging',
  '/joinery-services/carpenter',
  '/joinery-services/joiner',
  '/joinery-services/joinery',
  '/joinery-services/joinery-subcontractors',
  '/joinery-services/stud-wall-partitioning',
  '/joinery-services/traditional-cut-roofs',
  '/joinery-services/truss-roof-installers',
  '/joinery-services/steel-fire-exit-doors-installers',
  '/joinery-services/accessible-kitchen-installers',
  '/joinery-services/general-joinery',
  '/about',
  '/contact'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE)
        .then((cache) => {
          console.log('Service Worker: Caching static assets');
          return cache.addAll(STATIC_URLS);
        }),
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          console.log('Service Worker: Caching dynamic assets');
          return cache.addAll(DYNAMIC_URLS);
        })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('Service Worker: Installation failed:', error);
    })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    }).catch((error) => {
      console.error('Service Worker: Activation failed:', error);
    })
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image' || request.destination === 'font') {
    // Cache images and fonts aggressively
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'document') {
    // For HTML pages, try network first, fallback to cache
    event.respondWith(networkFirst(request));
  } else {
    // For other resources, try cache first, fallback to network
    event.respondWith(cacheFirst(request));
  }
});

// Cache First Strategy - for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First Strategy failed:', error);
    // Try to serve from cache as last resort
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return a fallback response
    return new Response('Network error occurred', { status: 503 });
  }
}

// Network First Strategy - for HTML pages
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network First Strategy failed:', error);
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return a fallback response
    return new Response('Page not available offline', { status: 503 });
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle any pending background tasks
    console.log('Service Worker: Processing background sync');
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/android-chrome-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('Service Worker: Loaded successfully');
