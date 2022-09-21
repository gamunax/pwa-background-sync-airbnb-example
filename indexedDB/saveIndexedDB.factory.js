app.factory('saveIndexedDB', ['IndexedDBMethods', Factory]);

function Factory(IndexedDBMethods) {
    let factory = {};

    factory.saveRental = function(data) {
        console.log('save', data);
        return IndexedDBMethods.clearTable('rentals').then(function(response) {
            console.log('clear', response);
            return IndexedDBMethods.addArrayObjectTable('rentals', data);
        });
    };

    return factory;
}
