function homeStudentController($scope, geocoderService, offerService) {

    function loadOffer() {
        offerService.getAll().then(function (res) {
            $scope.offers = res.data;

            //MAP
            L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
            var map = L.mapbox.map('map', 'mapbox.streets')
                .setView([46.84, 2.00], 5);

            //MARKERS
            $scope.offers.forEach(function (offer) {
                var address = offer.address + ", " + offer.zipCode + " " + offer.city + ", " + offer.country;

                geocoderService.CoordinateByAdress(address).then(function (res) {
                    var lng = res.data.features[0].geometry.coordinates[0];
                    var lat = res.data.features[0].geometry.coordinates[1];

                    var marker = new L.marker([lat, lng]).addTo(map);
                });
            });
        });
    }

    loadOffer();

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}