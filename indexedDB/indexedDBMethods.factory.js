app.factory('IndexedDBMethods', ['IndexedDB', Factory]);

function Factory(IndexedDB) {
    var factory = {};

    var db = IndexedDB.db();

    factory.clearTable = function(tableName) {
        return db[tableName].clear().catch(function(error) {
            console.error('Error');
        });
    };

    factory.getCountRegisters = function(tableName) {
        return db[tableName].count().catch(function(error) {
            console.error('Error');
        });
    };

    factory.addObjectTable = function(tableName, object) {
        return db[tableName].add(object).catch(function(error) {
            console.error('Error');
        });
    };

    factory.addArrayObjectTable = function(tableName, array) {
        return db[tableName].bulkAdd(array).catch(function(error) {
            console.error('Error');
        });
    };

    factory.getTable = function(tableName) {
        return db[tableName].toArray().catch(function(error) {
            console.error('Error');
        });
    };

    factory.deleteRegisterByColumn = function(tableName, column, valuesArray) {
        return db[tableName]
            .where(column)
            .anyOf(valuesArray)
            .delete()
            .catch(function(error) {
                console.error('Error');
            });
    };

    factory.udpdateRegisterByColumn = function(tableName, columnObject, data) {
        return db[tableName]
            .where(columnObject)
            .modify(data)
            .catch(function(error) {
                console.error('Error');
            });
    };

    factory.findById = function(tableName, object) {
        return db[tableName].get(object).catch(function(error) {
            console.error('Error');
        });
    };

    factory.findByMultipleValues = function(tableName, column, valuesArray) {
        return db[tableName]
            .where(column)
            .anyOf(valuesArray)
            .toArray()
            .catch(function(error) {
                console.error('Error');
            });
    };

    return factory;
}
