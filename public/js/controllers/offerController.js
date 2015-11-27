function offerController($scope, $http, $routeParams, offerService) {

    //LOAD OFFER
    var selectOffer = $routeParams.id;

    function loadOffer() {
        offerService.getOfferbyId(selectOffer).then(function (res) {
            $scope.offer = res.data;
        });
    }
    loadOffer();

    //LOAD RECRUITER 
    function loadRecruiter() {
        offerService.getRecruiterbyId(selectOffer.offerDate).then(function (res) {
            $scope.recruiter = res.data;
        });
    }

    //MAP
    function initialize() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);

}