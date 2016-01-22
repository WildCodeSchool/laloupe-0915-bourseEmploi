function config($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/connect.html',
            controller: 'connectController'
        })
        .when('/formOffer', {
            templateUrl: 'views/formOffer.html',
            controller: 'formOfferController',
            resolve: {
                connected: checkIsConnected
            }
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
        .when('/editRecruiter/:id', {
            templateUrl: 'views/editRecruiter.html',
            controller: 'editRecruiterController',
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
            controller: 'bookController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/book/:id', {
            templateUrl: 'views/bookStudent.html',
            controller: 'bookStudentController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/editBook/:id', {
            templateUrl: 'views/editBookStudent.html',
            controller: 'editBookStudentController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/connectRecruiter', {
            templateUrl: 'views/connectRecruiter.html'
        })
        .when('/formRecruiter', {
            templateUrl: 'views/formRecruiter.html',
            controller: 'formRecruiterController'
        })
        .when('/skills', {
            templateUrl: 'views/skills.html',
            controller: 'skillsController',
            resolve: {
                administrator: checkIsAdmin,
                connected: checkIsConnected
            }
        }).when('/editSchool', {
            templateUrl: 'views/editSchool.html',
            controller: 'editSchoolController',
            resolve: {
                administrator: checkIsAdmin,
                connected: checkIsConnected
            }
        }).when('/moderateOffer', {
            templateUrl: 'views/moderateOffer.html',
            controller: 'moderateOfferController',
            resolve: {
                administrator: checkIsAdmin,
                connected: checkIsConnected
            }
        }).when('/adminStats', {
            templateUrl: 'views/adminStats.html',
            controller: 'adminStatsController',
            resolve: {
                administrator: checkIsAdmin,
                connected: checkIsConnected
            }
        })
        .when('/adminBoards', {
            templateUrl: 'views/adminBoard.html',
            controller: 'adminBoardController',
            resolve: {
                administrator: checkIsAdmin,
                connected: checkIsConnected
            }
        })
        .when('/editOffer/:id', {
            templateUrl: 'views/editOffer.html',
            controller: 'editOfferController',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/mentionsLegales', {
            templateUrl: 'views/mentionsLegales.html'
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

function run($rootScope, $location, connectService, $cookies) {
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
        $cookies.remove('wildFInder_token');
        $rootScope.user = null;
        $rootScope.loginMessage.title = '';
        $rootScope.loginMessage.message = '';
        connectService.disconnect().then(function () {
            $location.url('/login');
        })
    }
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

angular.module('app', ['ngRoute', 'ngSanitize', 'ngCookies', 'ui.bootstrap'])
    .config(config)
    .controller('connectController', connectController)
    .controller('formRecruiterController', formRecruiterController)
    .controller('formOfferController', formOfferController)
    .controller('homeRctrController', homeRctrController)
    .controller('editRecruiterController', editRecruiterController)
    .controller('homeStudentController', homeStudentController)
    .controller('offerController', offerController)
    .controller('searchOfferController', searchOfferController)
    .controller('editOfferController', editOfferController)
    .controller('bookController', bookController)
    .controller('bookStudentController', bookStudentController)
    .controller('editBookStudentController', editBookStudentController)
    .controller('adminStatsController', adminStatsController)
    .controller('skillsController', skillsController)
    .controller('moderateOfferController', moderateOfferController)
    .controller('editSchoolController', editSchoolController)
    .controller('adminStatsController', adminStatsController)
    .controller('adminBoardController', adminBoardController)
    .service('connectService', connectService)
    .service('offerService', offerService)
    .service('skillService', skillService)
    .service('recruiterService', recruiterService)
    .service('geocoderService', geocoderService)
    .service('studentService', studentService)
    .service('schoolPromoService', schoolPromoService)
    .directive('capitalize', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    })

/*.factory('', )*/
.run(run);