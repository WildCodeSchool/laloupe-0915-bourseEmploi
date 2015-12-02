function config($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/connect.html',
            controller: 'connectController'
        })
        .when('/formOffer', {
            templateUrl: 'views/formOffer.html',
            controller: 'formOfferController'
        })
        .when('/searchOffer', {
            templateUrl: 'views/searchOffer.html',
            controller: 'searchOfferController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/offer/:id', {
            templateUrl: 'views/offer.html',
            controller: 'offerController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/homeRecruiter', {
            templateUrl: 'views/homeRctr.html',
            controller: 'homeRctrController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/homeStudent', {
            templateUrl: 'views/homeStudent.html',
            controller: 'homeStudentController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/book', {
            templateUrl: 'views/book.html',
            controller: 'bookController'
        })
        .when('/book/:id', {
            templateUrl: 'views/bookStudent.html',
            controller: 'bookStudentController'
        })
        .when('/connectRecruiter', {
            templateUrl: 'views/connectRecruiter.html',
            controller: 'connectRecruiterController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'adminController',
            resolve: {
                administrator: checkIsAdmin,
                connected: checkIsConnected
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
}

function checkIsConnected($q, $http, $rootScope, $location) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        // Authenticated 
        if (user !== '0') {
            $rootScope.user = user;
            deferred.resolve();
        } else {
            // Not Authenticated 
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};


function checkIsAdmin($q, $rootScope, $location) {
    var deferred = $q.defer();

    if ($rootScope.user && $rootScope.user.admin)
        deferred.resolve();
    else {
        deferred.reject();
        $location.url('/');
    }

    return deferred.promise;
}

function run($rootScope, $location, connectService) {
    $rootScope.loginMessage = {};
    $rootScope.loginMessage.title = '';
    $rootScope.loginMessage.message = '';
    // Watch path
    var path = function () {
        return $location.path();
    };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activetab = newVal;
    });

    // Logout
    $rootScope.logout = function () {
        $rootScope.user = null;
        $rootScope.loginMessage.title = '';
        $rootScope.loginMessage.message = '';
        connectService.disconnect().then(function () {
            $location.url('/login');
        })
    }
}


angular.module('app', ['ngRoute', 'ngSanitize'])
    .config(config)
    .controller('connectController', connectController)
    .controller('adminController', adminController)
    .controller('connectRecruiterController', connectRecruiterController)
    .controller('formOfferController', formOfferController)
    .controller('homeRctrController', homeRctrController)
    .controller('homeStudentController', homeStudentController)
    .controller('offerController', offerController)
    .controller('searchOfferController', searchOfferController)
    .controller('bookController', bookController)
    .controller('bookStudentController', bookStudentController)
    .service('connectService', connectService)
    .service('offerService', offerService)
    .service('skillService', skillService)
    .service('connectRecruiterService', connectRecruiterService)
    .service('geocoderService', geocoderService)

/*.factory('', )*/
.run(run);