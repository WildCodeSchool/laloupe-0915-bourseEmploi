function offerController($scope, $rootScope, $http, $location, $routeParams, offerService, geocoderService, recruiterService, studentService) {

    var selectOffer = $routeParams.id;
    var today = new Date();
    var d = moment(today).format();

    //LOAD OFFER
    function loadOffer() {
        offerService.getOfferbyId(selectOffer).then(function (res) {
            $scope.offer = res.data;
            $scope.company = res.data.referentId;

            //boutton ARCHIV ou DELETE en fonction de la date
            $scope.noPublish = false;
            $scope.deleteOR = false;
            $scope.titleExpired = true;
            $scope.titleArchiv = false;

            function deletOrArch() {
                if (d > $scope.offer.endDate) {
                    $scope.noPublish = true;
                    $scope.deleteOR = true;
                    $scope.titleExpired = false;
                    $scope.titleArchiv = true;
                }
            }
            deletOrArch();

            function pop() {
                var type = 'Recruiter';
                studentService.getAll(type).then(function (res) {
                    console.log();
                    console.log(res.data);
                    if (res.data._type === 'Recruiter')
                        $scope.showRcrt = true;
                });
            }
            pop();

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

    //ARCHIV
    $scope.archiv = function (selectOffer) {
        var data = {};
        data.endDate = moment(today).add(-1, 'days');
        offerService.update(selectOffer, data).then(function (res) {
            alert("Annonce archivée");
        });
        loadOffer();
    }

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