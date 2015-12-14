function offerController($scope, $http, $location, $routeParams, offerService, geocoderService, recruiterService) {

    var selectOffer = $routeParams.id;

    //EDIT
    $scope.edit = function () {
        $location.path('/editOffer/' + selectOffer)
    }

    //DELETE
    $scope.delete = function () {
        offerService.delete(selectOffer).then(function (res) {
            console.log(selectOffer);
            alert("annonce supprimée");
            $location.path('/homeRecruiter');
        });
    }

    //LOAD OFFER
    function loadOffer() {
        offerService.getOfferbyId(selectOffer).then(function (res) {
            $scope.offer = res.data;

            //LOAD RECRUITER 
            function loadRecruiter() {

                recruiterService.getRecruiterbyId($scope.offer.referentId).then(function (res) {
                    $scope.company = res.data;
                    console.log(res.data);
                });
            }

            loadRecruiter();

            moment.locale('fr')
            var a = moment($scope.offer.startDate);
            var b = moment($scope.offer.endDate);
            var c = moment();
            $scope.startOffer = c.from(a);
            $scope.endOffer = c.to(b);

            //MAP
            var address = $scope.offer.address + ", " + $scope.offer.zipCode + " " + $scope.offer.city + ", " + $scope.offer.country;
            $scope.fullAdress = address;
            geocoderService.CoordinateByAdress(address).then(function (res) {
                var lng = res.data.features[0].geometry.coordinates[0];
                var lat = res.data.features[0].geometry.coordinates[1];

                L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
                var map = L.mapbox.map('map', 'mapbox.streets')
                    .setView([lat, lng], 15);

                var marker = L.marker([lat, lng]).addTo(map);

            });

        });
    }
    loadOffer();

    //LOAD RECRUITER 
    function loadRecruiter() {

        offerService.getRecruiterbyId($scope.offer.referentId).then(function (res) {
            $scope.company = res.data;
        });

        if ($scope.company.website == undefined) {
            $scope.websiteIf = true;
        };
        if ($scope.company.facebook == undefined) {
            $scope.facebookIf = true;
        };
        if ($scope.company.twitter == undefined) {
            $scope.twitterIf = true;
        };
        if ($scope.company.instagram == undefined) {
            $scope.instagramIf = true;
        };
        if ($scope.company.linkedin == undefined) {
            $scope.linkedinIf = true;
        };
        if ($scope.company.phone == undefined) {
            $scope.linkedinIf = true;
        };
    }

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}