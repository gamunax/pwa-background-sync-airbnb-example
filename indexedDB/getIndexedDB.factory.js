app.factory('getIndexedDB', ['IndexedDBMethods', Factory]);

function Factory(IndexedDBMethods) {
    let factory = {};

    factory.getRental = function() {
        console.log('get');
        return IndexedDBMethods.getTable('rentals');
    };

    return factory;
}
