function offerController($scope, $rootScope, $http, $location, $routeParams, offerService, geocoderService, recruiterService, studentService, $route) {

    var selectOffer = $routeParams.id;
    var today = new Date();
    var d = moment(today).format();

    //STUDENTS'LIKE UPDATE IN ROOTSCOPE
    studentService.getUserbyId($rootScope.user._id).then(function (res) {
        $scope.student = res.data
        var offerliked = [];
        $scope.student.likes.forEach(function (like) {
            offerliked.push(like._id);
        }.bind($scope));
        console.log(offerliked)
        $rootScope.user.likes = offerliked;
    });

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

            //CHECK USER TYPE
            function pop() {
                var type = 'Recruiter';
                recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
                    $scope.type = res.data;
                    console.log($scope.type._type);
                    if ($scope.type._type === 'Recruiter')
                        $scope.showRcrt = true;
                    else
                        $scope.showStudent = true;
                });
            }
            pop();

            moment.locale('fr')
            var a = moment($scope.offer.startDate);
            var b = moment($scope.offer.endDate);
            var c = moment();
            $scope.startOffer = c.to(a);
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

            //CHECK IS lIKED
            $scope.offer.isLiked = ($rootScope.user.likes.indexOf($scope.offer._id) > -1);
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

    //LIKE
    function like(offer) {
        var data = {}
        data.like = offer._id
        studentService.like($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.push(offer._id);
            $scope.offer.isLiked = true;
            //$route.reload()
        });
    };
    //UNLIKE
    function unlike(offer) {
        var data = {}
        data.unlike = offer._id
        studentService.unlike($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.splice($rootScope.user.likes.indexOf(offer._id), 1);
            $scope.offer.isLiked = false;
            //$route.reload()
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

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}