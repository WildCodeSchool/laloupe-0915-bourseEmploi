function moderateOfferController($scope, offerService, $location, $rootScope) {

    //Chargement des offres à publier
    function loadOffer() {
        offerService.getNotPublished().then(function (res) {
            $scope.publishOffers = res.data;
            $scope.numberOffer = res.data.length;
            console.log(res.data);
        })
    }
    loadOffer();

    //Chargement des offres à arrivant à expiration
    function loadEndOfOffer() {
        offerService.getSoonEndedOffers().then(function (res) {
            $scope.endOfOffers = res.data;
            $scope.numberEndOfOffers = res.data.length;
            console.log(res.data);
        })
    }
    loadEndOfOffer();

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
    $scope.alertDate = function (date) {
        moment.locale('fr')
        var c = moment(date).format('DD MMMM YYYY [à] HH:mm');
        return c;
    }

    //Lien vers l'offre
    $scope.goToOffer = function (offer) {
        $location.path('/offer/' + offer._id)
    }


};