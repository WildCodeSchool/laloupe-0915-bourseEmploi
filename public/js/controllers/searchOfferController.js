function searchOfferController($scope, offerService, skillService, studentService, $location, $rootScope, geocoderService) {

    function loadSkill() {
        skillService.get().then(function (res) {
            $scope.skills = res.data;
        })
    }
    loadSkill();

    //STUDENTS'LIKE UPDATE IN ROOTSCOPE
    studentService.getUserbyId($rootScope.user._id).then(function (res) {
        $scope.student = res.data
        var offerliked = [];
        $scope.student.likes.forEach(function (like) {
            offerliked.push(like._id);
        }.bind($scope));
        $rootScope.user.likes = offerliked;
    });

    //NUMBER LIKED
    function numberLiked(offer) {
        studentService.howmanyliked(offer._id).then(function (res) {
            offer.numberLiked = res.data
        });
    }

    //MAP
    L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([46.84, 2.00], 5);

    L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
    var map2 = L.mapbox.map('map2', 'mapbox.streets')
        .setView([46.84, 2.00], 5);

    //MARKERS
    var markers = new L.MarkerClusterGroup();
    var markers2 = new L.MarkerClusterGroup();

    $scope.searchOffers = function () {
        markers.clearLayers();
        markers2.clearLayers();
        var data = {};
        data.region = $scope.region;
        data.skill = $scope.querySkill;
        data.contract = $scope.contract;
        data.experience = $scope.experience;
        offerService.getOffersFiltered(data).then(function (res) {
            $scope.offers = res.data;
            //CHECK IS lIKED
            for (var i = 0; i < $scope.offers.length; i++) {
                $scope.offers[i].isLiked = ($rootScope.user.likes.indexOf($scope.offers[i]._id) > -1);
                numberLiked($scope.offers[i]);
                console.log($scope.offers[i])
                    //MAP
                var address = $scope.offers[i].address + ", " + $scope.offers[i].zipCode + " " + $scope.offers[i].city + ", " + $scope.offers[i].country;
                geocoderService.CoordinateByAdress(address).then(function (res) {
                    var offer = $scope.offers[i];
                    var lng = res.data.features[0].geometry.coordinates[0];
                    var lat = res.data.features[0].geometry.coordinates[1];

                    var marker = L.marker(new L.LatLng([lat], [lng]), {
                        icon: L.mapbox.marker.icon({
                            'marker-color': '009587'
                        })
                    });
                    var textpopup = '<a href="/#/offer/' + offer._id + '"><b>' + offer.title + '</b></a><br>' + offer.city;
                    marker.bindPopup(textpopup);
                    markers.addLayer(marker);
                    var marker2 = L.marker(new L.LatLng([lat], [lng]), {
                        icon: L.mapbox.marker.icon({
                            'marker-color': '009587'
                        })
                    });
                    marker2.bindPopup(textpopup);
                    markers2.addLayer(marker2);
                });
            };
            map.addLayer(markers);
            map2.addLayer(markers2);
        });
    }
    $scope.searchOffers();
    $scope.showMap = true;

    $scope.today = new Date();
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

    //LIKE
    function like(offer) {
        var data = {}
        data.like = offer._id
        studentService.like($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.push(offer._id);
            offer.isLiked = true;
            numberLiked(offer);
        });
    };
    //UNLIKE
    function unlike(offer) {
        var data = {}
        data.unlike = offer._id
        studentService.unlike($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.splice($rootScope.user.likes.indexOf(offer._id), 1);
            offer.isLiked = false;
            numberLiked(offer);
        });
    };
    //LIKE OR UNLIKE
    $scope.likeClick = function (offer) {
        if ($rootScope.user.likes.indexOf(offer._id) > -1) {
            unlike(offer);
        } else {
            like(offer);
        }
    }

    //LINK TO OFFER PAGE 
    $scope.goToOffer = function (offer) {
        $location.path('/offer/' + offer._id);
    }

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}