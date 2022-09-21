app.factory('backgroundSync', [Factory]);

function Factory() {
    let factory = {};

    factory.register = function() {
        if (!navigator.serviceWorker) {
            return console.error('Service Worker not supported');
        }

        navigator.serviceWorker.ready
            .then(registration => registration.sync.register('syncRentals'))
            .then(() => console.log('Registered background sync'))
            .catch(err => console.error('Error registering background sync', err));
    };

    return factory;
}
