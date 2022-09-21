(function() {
    'use strict';

    angular
        .module('app')
        .controller('mainController', [
            'airbnbService',
            'IndexedDB',
            'saveIndexedDB',
            'IndexedDBMethods',
            'syncIndexedDB',
            'backgroundSync',
            '$scope',
            '$rootScope',
            Controller
        ]);

    function Controller(
        airbnbService,
        IndexedDB,
        saveIndexedDB,
        IndexedDBMethods,
        syncIndexedDB,
        backgroundSync,
        $scope,
        $rootScope
    ) {
        const vm = this;

        IndexedDB.initialize();
        navigator.serviceWorker.register('./sw.js');
        backgroundSync.register();

        vm.syncing = '';
        airbnbService.getAllReviews().then(function(response) {
            vm.results = response.data;
        });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', function handler(event) {
                console.log(event);
                if (event.data.type === 'syncing') {
                    $rootScope.$broadcast('syncing', event.data.response);
                }
            });

            navigator.serviceWorker.addEventListener('message', function handler(event) {
                if (event.data.type === 'synced') {
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            });
        }

        $scope.$on('syncing', function(event, data) {
            vm.syncing = data.lenght > 0 ? 'syncing....' : '';
        });

        vm.download = function() {
            const data = vm.results.map(({ name, summary, beds, images: { picture_url } }) => {
                return {
                    name,
                    summary,
                    beds,
                    images: {
                        picture_url
                    },
                    status: 'active',
                    sync: false
                };
            });
            return saveIndexedDB.saveRental(data);
        };

        // vm.sync = function() {
        //     return syncIndexedDB.sync();
        // };

        vm.registerData = function() {
            const data = [
                {
                    name: 'test name 1',
                    summary: 'sumary test 1',
                    beds: 2,
                    status: 'modify',
                    sync: false,
                    images: {
                        picture_url:
                            'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                    }
                },
                {
                    name: 'test name 2',
                    summary: 'sumary test 2',
                    beds: 2,
                    status: 'modify',
                    sync: false,
                    images: {
                        picture_url:
                            'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                    }
                },
                {
                    name: 'test name 3',
                    summary: 'sumary test 3',
                    beds: 3,
                    status: 'modify',
                    sync: false,
                    images: {
                        picture_url:
                            'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                    }
                },
                {
                    name: 'test name 4',
                    summary: 'sumary test 4',
                    beds: 5,
                    status: 'modify',
                    sync: false,
                    images: {
                        picture_url:
                            'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                    }
                },
                {
                    name: 'test name 5',
                    summary: 'sumary test 5',
                    beds: 1,
                    status: 'modify',
                    sync: false,
                    images: {
                        picture_url:
                            'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                    }
                }
                // {
                //     name: 'test name 6',
                //     summary: 'sumary test 6',
                //     beds: 4,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 7',
                //     summary: 'sumary test 7',
                //     beds: 6,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 8',
                //     summary: 'sumary test 8',
                //     beds: 4,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 9',
                //     summary: 'sumary test 9',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 10',
                //     summary: 'sumary test 10',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 11',
                //     summary: 'sumary test 11',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 12',
                //     summary: 'sumary test 12',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 13',
                //     summary: 'sumary test 13',
                //     beds: 1,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 14',
                //     summary: 'sumary test 14',
                //     beds: 1,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 15',
                //     summary: 'sumary test 15',
                //     beds: 5,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 16',
                //     summary: 'sumary test 16',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 17',
                //     summary: 'sumary test 17',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 18',
                //     summary: 'sumary test 18',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 19',
                //     summary: 'sumary test 19',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 20',
                //     summary: 'sumary test 20',
                //     beds: 4,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 21',
                //     summary: 'sumary test 21',
                //     beds: 5,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 22',
                //     summary: 'sumary test 22',
                //     beds: 1,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 23',
                //     summary: 'sumary test 23',
                //     beds: 1,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 24',
                //     summary: 'sumary test 24',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 25',
                //     summary: 'sumary test 25',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 26',
                //     summary: 'sumary test 26',
                //     beds: 3,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 27',
                //     summary: 'sumary test 27',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 28',
                //     summary: 'sumary test 28',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 29',
                //     summary: 'sumary test 29',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 30',
                //     summary: 'sumary test 30',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 31',
                //     summary: 'sumary test 31',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // },
                // {
                //     name: 'test name 32',
                //     summary: 'sumary test 32',
                //     beds: 2,
                //     status: 'modify',
                //     sync: false,
                //     images: {
                //         picture_url:
                //             'https://a0.muscache.com/im/pictures/6b3b1b1a-1b1a-4b1a-1b1a-1b1a1b1a1b1a.jpg?aki_policy=large'
                //     }
                // }
            ];
            IndexedDBMethods.addArrayObjectTable('rentals', data);
        };

        return vm;
    }

    app.run(function($window, $rootScope) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener(
            'offline',
            function() {
                $rootScope.$apply(function() {
                    $rootScope.online = false;
                });
            },
            false
        );
        $window.addEventListener(
            'online',
            function() {
                $rootScope.$apply(function() {
                    $rootScope.online = true;
                });
            },
            false
        );
    });
})();
