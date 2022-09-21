app.factory('syncIndexedDB', ['IndexedDBMethods', 'airbnbService', Factory]);

function Factory(IndexedDBMethods, airbnbService) {
    let factory = {};

    factory.sync = function() {
        return IndexedDBMethods.findByMultipleValues('rentals', 'status', ['modify']).then(function(response) {
            response.forEach(function({ name, summary, beds, images: { picture_url } }, index) {
                const request = {
                    name,
                    summary,
                    beds,
                    images: {
                        picture_url
                    }
                };
                setTimeout(function() {
                    return airbnbService.saveReview(request);
                }, 2000 * index);
            });
        });
    };

    return factory;
}
