importScripts('https://unpkg.com/dexie@3.2.2/dist/dexie.min.js');

const STATIC_FILES = [
    'index.html',
    'app.js',
    'components/header/header.component.html',
    'components/card/card.component.html',
    'controllers/mainController.controller.js',
    'components/header/header.component.js',
    'components/card/card.component.js',
    'services/airbnb.service.js',
    'indexedDB/indexedDB.factory.js',
    'indexedDB/indexedDBMethods.factory.js',
    'indexedDB/saveIndexedDB.factory.js',
    'indexedDB/getIndexedDB.factory.js',
    'indexedDB/syncIndexedDB.factory.js',
    'serviceworker/backgroundSync.factory.js'
];

const INMUTABLE_FILES = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js',
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    'https://unpkg.com/dexie@3.2.2/dist/dexie.min.js'
];

const ENDPOINT_NO_CACHE = ['api-mongo-mfory/endpoint/api', 'api-mongo-mfory/endpoint/register'];

self.addEventListener('install', e => {
    const cacheStatic = caches.open('static').then(cache => cache.addAll(STATIC_FILES));
    const cacheInmutable = caches.open('inmutable').then(cache => cache.addAll(INMUTABLE_FILES));
    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

function dinamycCacheUpdate(dynamicCache, req, res) {
    return caches.open(dynamicCache).then(cache => {
        cache.put(req, res.clone());
        return res.clone();
    });
}

self.addEventListener('activate', e => {
    return self.clients.claim();
});

function isInData(string, dataArray) {
    var counter = 0;
    for (var element of dataArray) {
        if (string.indexOf(element) > -1) {
            counter += 1;
        }
    }
    return counter > 0;
}

self.addEventListener('fetch', e => {
    if (isInData(e.request.url, ENDPOINT_NO_CACHE)) {
        return e;
    }

    const response = caches.match(e.request).then(resp => {
        if (resp) return resp;

        return fetch(e.request).then(newRes => {
            return dinamycCacheUpdate('dynamic', e.request, newRes);
        });
    });

    e.respondWith(response);
});

function serviceWorkerMessage(data) {
    self.clients.matchAll().then(function(all) {
        all.map(function(client) {
            client.postMessage(data);
        });
    });
}

self.addEventListener('sync', function(event) {
    console.log('sync event', event);
    if (event.tag === 'syncRentals') {
        event.waitUntil(syncRentals()); // sending sync request
    }
});

function syncRentals() {
    const db = new Dexie('airbnbDemo');
    db.version(2).stores({
        rentals: '++id, name, summary, beds, images.picture_url, sync, status'
    });

    const result = db['rentals']
        .where('status')
        .anyOf(['modify'])
        .toArray()
        .catch(function(error) {
            console.error('Error');
        });

    result.then(function(response) {
        response.forEach(function({ name, summary, beds, images: { picture_url } }, index, array) {
            const request = {
                name,
                summary,
                beds,
                images: {
                    picture_url
                }
            };
            setTimeout(function() {
                const url = 'https://us-east-1.aws.data.mongodb-api.com/app/api-mongo-mfory/endpoint/register';
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }
                }).then(function(response) {
                    console.log('response', response);
                    return db['rentals']
                        .where('status')
                        .anyOf(['modify'])
                        .delete()
                        .catch(function(error) {
                            console.error('Error');
                        });
                });

                if (array.length === index + 1) {
                    serviceWorkerMessage(true);
                }
            }, 2000 * index);
        });
    });
}