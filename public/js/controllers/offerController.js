function offerController($scope, $http, $routeParams, offerService) {

    //LOAD OFFER
    var selectOffer = $routeParams.id;

    function loadOffer() {
        offerService.getOfferbyId(selectOffer).then(function (res) {
            $scope.offer = res.data;

            console.log(res.data)
        });


    }
    loadOffer();

    //LOAD RECRUITER 
    function loadRecruiter() {

        offerService.getRecruiterbyId(selectOffer.offerDate).then(function (res) {
            $scope.recruiter = res.data;
        });

        if ($scope.recruiter.website == undefined) {
            $scope.websiteIf = true;
        };
        if ($scope.recruiter.facebook == undefined) {
            $scope.facebookIf = true;
        };
        if ($scope.recruiter.twitter == undefined) {
            $scope.twitterIf = true;
        };
        if ($scope.recruiter.instagram == undefined) {
            $scope.instagramIf = true;
        };
        if ($scope.recruiter.linkedin == undefined) {
            $scope.linkedinIf = true;
        };
    }

    //MAP
    L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([46.84, 2.00], 5);
}