function homeStudentController($scope, geocoderService, offerService, studentService, $rootScope) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //LOAD STUDENT
    studentService.getUserbyId($rootScope.user._id).then(function (res) {
        $scope.student = res.data;
    });

    //MAP
    function loadOffer() {
        offerService.getAll().then(function (res) {
            $scope.offers = res.data;

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

    //MATCHING OFFER
    $scope.startOffer = function (date) {
        moment.locale('fr')
        var d = moment(date);
        return d.fromNow();
    }

    function arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    studentService.getUserbyId($rootScope.user._id).then(function (res) {
        var student = res.data;
        var matchOffer = [];
        student.skills.forEach(function (o) {
            var skill = o.skill;
            var data = {};
            data.skills = [];
            data.language = {};
            if (skill.language == true) {
                data.language = {
                    skill: skill._id
                }
                student.skills.forEach(function (a) {
                    var skill = a.skill;
                    if (skill.language == false) {
                        data.skills.push(skill._id);
                    }
                });
                offerService.getOfferBySkill(data).then(function (res) {
                    matchOffer = arrayUnique(res.data.concat(matchOffer));
                    console.log(matchOffer);
                    $scope.matchingOffers = matchOffer;
                });
            }
        });
    });
}