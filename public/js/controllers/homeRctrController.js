function homeRctrController($http, $scope, $rootScope, $location, $routeParams, offerService, studentService) {

    function loadOffers() {
        offerService.getOfferByUser($rootScope.user._id).then(function (res) {
            $scope.offerLists = res.data;
        });
    }
    loadOffers();

//    function loadStudents() {
//        var type = 'Student';
//        studentService.getAll(type).then(function (res) {
//            $scope.students = res.data;
//        });
//    }
//    loadStudents();

    //Lien vers l'EDITION de l'offre
    var selectOffer = $routeParams.id;
    $scope.edit = function (selectOffer) {
        $location.path('/editOffer/' + selectOffer)
    }

    //Lien vers la PAGE offre
    $scope.goToOffer = function (offer) {
        $location.path('/offer/' + offer._id);
    }

    //ARCHIV d'une offre via actualisation de la fin de date de publication
    $scope.archiv = function (selectOffer) {
        var today = new Date();
        console.log(today);
        var data = {};
        data.endDate = moment(today).add(-1, 'days');
        offerService.update(selectOffer, data).then(function (res) {
            alert("Annonce archivée");
        });
        loadOffers();
    }

    //SUPPRESSION d'une offre
    $scope.delete = function (selectOffer) {
        offerService.delete(selectOffer).then(function (res) {
            alert("annonce suprimée");
        });
        loadOffers();
    }

    //TRI des offres en fonction des dates
    $scope.today = new Date();
    $scope.after = function (dates) {
        return moment($scope.today).isAfter(dates);
    }
    $scope.before = function (dates) {
        return moment($scope.today).isBefore(dates);
    }

    //Affichage des dates dans les listes des annonces
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