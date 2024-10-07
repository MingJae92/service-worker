// Name your cache
const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Add paths to your CSS files
  '/main.jsx',   // Add paths to your JS files
  // Add any other assets you want to cache at install time
];

// Install event: cache the necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached content or fallback to network
self.addEventListener('fetch', (event) => {
  console.log('Fetch request for:', event.request.url); // Log each fetch request

  // Check if the request is from the same origin or allowed external URLs
  if (event.request.method === 'GET' && (event.request.url.startsWith(self.location.origin) || event.request.url.startsWith("https://dummyjson.com"))) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response; // Serve from cache if available
        }

        console.log('Fetching from network:', event.request.url); // Log network fetch

        return fetch(event.request).then((fetchResponse) => {
          // Check if we received a valid response
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse; // Return if the response is invalid or not cacheable
          }

          return caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching new response:', event.request.url);
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse; // Return the original response
          });
        });
      }).catch((error) => {
        console.error('Fetching failed:', error);
      })
    );
  } else {
    console.log('Fetching from network (external or unsupported):', event.request.url); // Log external fetch
    event.respondWith(fetch(event.request)); // Directly fetch if not from the same origin
  }
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
