function homeRctrController($http, $scope, $rootScope, $location, offerService, studentService) {

    function loadOffers() {
        offerService.getOfferByUser($rootScope.user._id).then(function (res) {
            $scope.offerLists = res.data;
            console.log($scope.offerLists);
        });
    }
    loadOffers();

    function loadStudents() {
        studentService.getAll().then(function (res) {
            $scope.students = res.data;
            console.log($scope.students);
        });
    }
    loadStudents();

    //affichage des dates dans les listes d'offres
    $scope.today = moment().format('YYYY-MM-DD');
    $scope.startOffer = function (date) {
        moment.locale('fr')
        var a = moment(date);
        return a.fromNow();
    }
    $scope.endOffer = function (date) {
        moment.locale('fr')
        var b = moment(date);
        return b.fromNow();
    }
    $scope.goToOffer = function (offer) {
        $location.path('/offer/' + offer._id);
    }

    //SWITCHER OFFER
    $scope.currentoffers = true;
    $scope.comingoffers = false;
    $scope.expiredoffers = false;

    $scope.show1 = function () {
        $scope.currentoffers = true;
        $scope.comingoffers = false;
        $scope.expiredoffers = false;
    }

    $scope.show2 = function () {
        $scope.currentoffers = false;
        $scope.comingoffers = true;
        $scope.expiredoffers = false;
    }

    $scope.show3 = function () {
        $scope.currentoffers = false;
        $scope.comingoffers = false;
        $scope.expiredoffers = true;
    }

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}