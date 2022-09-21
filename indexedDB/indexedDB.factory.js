app.factory('IndexedDB', [Factory]);

function Factory() {
    let factory = {};

    const db = new Dexie('airbnbDemo');
    console.log(db);

    factory.db = function() {
        return db;
    };

    factory.initialize = function() {
        db.version(2).stores({
            rentals: '++id, name, summary, beds, images.picture_url, sync, status'
        });
    };

    factory.dropDB = function() {
        db.delete();
        db.close();
    };

    return factory;
}
