const staticCacheName = 'restaurant-reviews-1';

//Install site assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    //cache the pages
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/dbhelper.js'
      ]);
    })
  );
  //cache the images
  event.waitUntil(
    caches.open('images').then(function(cache) {
      return cache.addAll([
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    })
  );
  //cache the database
  event.waitUntil(
    caches.open('data').then(function(cache) {
      return cache.addAll([
        '/data/restaurants.json'
      ]);
    })
  );
});

//Send requests to cache
//This addes offline capability
self.addEventListener('fetch', function(event) {

 event.respondWith(
   caches.match(event.request, {ignoreSearch : true}).then(function(response) {
     return response || fetch(event.request);
   }).catch(function(error) {
     console.log(error);
   })
 );
});
