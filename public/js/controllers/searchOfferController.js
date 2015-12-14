function searchOfferController($scope, offerService, geocoderService) {

    $scope.showMap = true;

    //MAP
    L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([46.84, 2.00], 5);

    L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
    var map2 = L.mapbox.map('map2', 'mapbox.streets')
        .setView([46.84, 2.00], 5);

    function loadOffer() {
        offerService.getAll().then(function (res) {
            $scope.offers = res.data;
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

            //MARKERS
            $scope.offers.forEach(function (offer) {
                if ($scope.after(offer.startDate) && $scope.before(offer.enDate)) {
                    var address = offer.address + ", " + offer.zipCode + " " + offer.city + ", " + offer.country;

                    geocoderService.CoordinateByAdress(address).then(function (res) {
                        var lng = res.data.features[0].geometry.coordinates[0];
                        var lat = res.data.features[0].geometry.coordinates[1];

                        var marker = new L.marker([lat, lng]).addTo(map);
                        var marker2 = new L.marker([lat, lng]).addTo(map2);
                    });
                }
            }.bind($scope));

        });
    }

    loadOffer();

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}