function offerController($scope, $http, $routeParams, offerService, geocoderService) {

    //LOAD OFFER
    var selectOffer = $routeParams.id;

    function loadOffer() {
        offerService.getOfferbyId(selectOffer).then(function (res) {
            $scope.offer = res.data;
            console.log(res.data)

            moment.locale('fr')
            var a = moment($scope.offer.startDate);
            var b = moment($scope.offer.endDate);
            var c = moment();
            $scope.startOffer = c.from(a);
            $scope.endOffer = c.to(b);

            //MAP
            var adress = $scope.offer.adress + ", " + $scope.offer.zipCode + " " + $scope.offer.city + ", " + $scope.offer.country;
            $scope.fullAdress = adress;
            console.log(adress)
            geocoderService.CoordinateByAdress(adress).then(function (res) {
                console.log(res.data);
                var lng = res.data.features[0].geometry.coordinates[0];
                var lat = res.data.features[0].geometry.coordinates[1];
                console.log(lng);
                console.log(lat);
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
}