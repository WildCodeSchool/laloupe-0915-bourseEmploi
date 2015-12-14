function homeRctrController($http, $scope, $rootScope, $location, $routeParams, offerService, studentService) {

    //EDIT
    var selectOffer = $routeParams.id;
    $scope.edit = function (selectOffer) {
        $location.path('/editOffer/' + selectOffer)
    }

    function loadOffers() {
        offerService.getOfferByUser($rootScope.user._id).then(function (res) {
            $scope.offerLists = res.data;
            console.log($scope.offerLists);
        });
    }
    loadOffers();

    function loadStudents() {
        var type = 'Student';
        studentService.getAll(type).then(function (res) {
            $scope.students = res.data;
            console.log($scope.students);
        });
    }
    loadStudents();

    //affichage des dates dans les listes d'offres
    $scope.today = new Date();
    console.log($scope.today);
    $scope.after = function (dates) {
        return moment($scope.today).isAfter(dates);
    }
    $scope.before = function (dates) {
        return moment($scope.today).isBefore(dates);
    }

    $scope.startOffer = function (date) {
        moment.locale('fr')
        var d = moment(date);
        return d.fromNow();
    }
    $scope.endOffer = function (date) {
        moment.locale('fr')
        var d = moment(date);
        return d.fromNow();
    }
    $scope.goToOffer = function (offer) {
        $location.path('/offer/' + offer._id);
    }

    //SWITCHER OFFER
    $scope.currentoffers = true;
    $scope.comingoffers = false;
    $scope.expiredoffers = false;

    $scope.numberOffer = 0;

    $scope.show1 = function () {
        $scope.currentoffers = true;
        $scope.comingoffers = false;
        $scope.expiredoffers = false;
        $scope.numberOffer = 0;

    }

    $scope.show2 = function () {
        $scope.currentoffers = false;
        $scope.comingoffers = true;
        $scope.expiredoffers = false;
        $scope.numberOffer = 1;
    }

    $scope.show3 = function () {
        $scope.currentoffers = false;
        $scope.comingoffers = false;
        $scope.expiredoffers = true;
        $scope.numberOffer = 2;
    }

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}