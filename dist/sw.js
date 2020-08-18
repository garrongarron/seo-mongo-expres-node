let cacheName = 'v1'
let cacheAssets = [
    '/',
    '/nointernet/fallback.html'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(cacheAssets)
        }).then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(cacheList => {
            return Promise.all(
                cacheList.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: cleaning old caches')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            let response = fetch(e.request).then(fetchRes => {
                return caches.open(cacheName).then(cache => {
                    cache.put(e.request, fetchRes.clone())
                    return fetchRes
                })
            }).catch(e => {
                if (typeof res == 'undefined') {
                    alert('No insternet conection')
                    throw 'No insternet conection'
                }
            })
            return res || response
        }).catch(() => {
            return caches.match('/nointernet/fallback.html')
        })
    )
})
