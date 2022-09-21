app.factory('airbnbService', [
    '$http',
    '$rootScope',
    'getIndexedDB',
    function($http, $rootScope, getIndexedDB) {
        const baseUrl = 'https://us-east-1.aws.data.mongodb-api.com/app/api-mongo-mfory/endpoint/api';
        return {
            getAllReviews: getAllReviews,
            saveReview: saveReview
        };

        function getAllReviews() {
            console.log($rootScope.online);
            return $http
                .get(baseUrl)
                .then(function(response) {
                    console.log('response', response);
                    return response;
                })
                .catch(function(error) {
                    console.error('error Server', error);
                    return getIndexedDB
                        .getRental()
                        .then(function(response) {
                            console.log('response indexedDB', response);
                            return { data: response };
                        })
                        .catch(function(error) {
                            console.error('error IndexedDB', error);
                        });
                });
        }

        function saveReview(obj) {
            const url = 'https://us-east-1.aws.data.mongodb-api.com/app/api-mongo-mfory/endpoint/register';
            $http.post(url, JSON.stringify(obj)).then(function(response) {
                console.log('response', response);
            });
        }
    }
]);
