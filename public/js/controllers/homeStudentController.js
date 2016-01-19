function homeStudentController($scope, $rootScope, geocoderService, offerService, studentService, skillService, $routeParams, $location) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //TRI des offres en fonction des dates
    $scope.today = new Date();
    $scope.after = function (dates) {
        return moment($scope.today).isAfter(dates);
    }
    $scope.before = function (dates) {
        return moment($scope.today).isBefore(dates);
    }

    function loadSkill() {
        //LOAD STUDENT
        studentService.getUserbyId($rootScope.user._id).then(function (res) {
            $scope.student = res.data;
            $scope.studentSkill = res.data.skills;

            /****   CREATION TAGS ******/
            //Import des compétences de shéma "skills"
            skillService.get().then(function (res) {
                $scope.offerSkills = res.data;
            });

            //Init de la fonctionnalitée
            $scope.showSkill = false;
            var dataSkilled = [];
            $scope.listSkills = dataSkilled;

            //Ajout des skills de l'user
            $scope.$watch('$viewContentLoaded', function () {
                // traitement à effectuer au chargement de la page
                $scope.studentSkill.forEach(function (skill) {
                    dataSkilled.push(skill.skill.title);
                });
                $scope.showSkill = true;
            });

            //Vérification et ajout de la valeur de l'input
            function updateSkill(array, up) {
                $scope.errorTyping = true;
                $scope.offerSkills.forEach(function (skill) {
                    if (up == skill.title) {
                        $scope.errorTyping = false;
                    }
                });
                if (!$scope.errorTyping && dataSkilled.indexOf(up) === -1) {
                    dataSkilled.push(up);
                } else if (dataSkilled.indexOf(up) > -1) {
                    $scope.errorChoice = true;
                }
            }

            //Lancement de la fonction  precedente au clic
            $scope.add = function () {
                $scope.errorChoice = false;
                $scope.errorTyping = false;
                var up = $scope.chooseSkill.toUpperCase();
                updateSkill(dataSkilled, up);
                //Affichage du skill et champ vide
                //$scope.showSkill = true;
                $scope.chooseSkill = "";

                var data = {};
                var idSkill = [];
                data.skills = idSkill;
                for (var i = 0; i < $scope.offerSkills.length; i++) {
                    var objs = {
                        skill: ""
                    };
                    var current = $scope.offerSkills[i].title;
                    $scope.listSkills.forEach(function (skill) {
                        if (current === skill) {
                            objs.skill = $scope.offerSkills[i]._id;
                            idSkill.push(objs);
                        }
                    });
                }
                studentService.update($rootScope.user._id, data).then(function (res) {})
            }

            //Suppression des Tags
            $scope.deleteSkill = function deleteASkill(skill) {
                var idDeletedSkill = dataSkilled.indexOf(skill);
                dataSkilled.splice(idDeletedSkill, 1);

                var data = {};
                var idSkill = [];
                data.skills = idSkill;
                for (var i = 0; i < $scope.offerSkills.length; i++) {
                    var objs = {
                        skill: ""
                    };
                    var current = $scope.offerSkills[i].title;
                    $scope.listSkills.forEach(function (skill) {
                        if (current === skill) {
                            objs.skill = $scope.offerSkills[i]._id;
                            idSkill.push(objs);
                        }
                    });
                }
                studentService.update($rootScope.user._id, data).then(function (res) {})
            }

            //STUDENTS'LIKE UPDATE IN ROOTSCOPE
            var offerLikedId = [];
            $scope.likedOffers = [];
            var i = 0
            $scope.student.likes.forEach(function (like) {
                offerLikedId.push(like._id);
            }.bind($scope));
            $rootScope.user.likes = offerLikedId;
            //LOAD LIKED OFFER
            offerLikedId.forEach(function (like) {
                offerService.getOfferbyId(like).then(function (res) {
                    $scope.likedOffers.push(res.data);
                    //NUMBER OF LIKED OFFER
                    if ($scope.after(res.data.startDate) && $scope.before(res.data.endDate)) {
                        i++
                    };
                    $scope.numberMatchOffer = i
                });

            });



        });
    }
    loadSkill();

    //MAP
    function loadOffer() {
        offerService.getAllCurrent().then(function (res) {
            $scope.offers = res.data;
            L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
            var map = L.mapbox.map('map', 'mapbox.streets')
                .setView([46.84, 2.00], 5);

            //MARKERS
            var markers = new L.MarkerClusterGroup();

            $scope.offers.forEach(function (offer) {
                var address = offer.address + ", " + offer.zipCode + " " + offer.city + ", " + offer.country;
                geocoderService.CoordinateByAdress(address).then(function (res) {
                    var lng = res.data.features[0].geometry.coordinates[0];
                    var lat = res.data.features[0].geometry.coordinates[1];

                    var marker = L.marker(new L.LatLng([lat], [lng]), {
                        icon: L.mapbox.marker.icon({
                            'marker-color': '009587'
                        })
                    });
                    marker.bindPopup('<a href="/#/offer/' + offer._id + '"><b>' + offer.title + '</b></a><br>' + offer.city);
                    markers.addLayer(marker);
                });
            }.bind($scope));

            map.addLayer(markers);
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

    //LINK TO OFFER PAGE 
    $scope.goToOffer = function (offer) {
        $location.path('/offer/' + offer._id);
    }

    function loadMatchOffer() {
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
                        $scope.matchingOffers = matchOffer;

                        //CHECK IS lIKED
                        $scope.matchingOffers.forEach(function (offer) {
                            offer.isLiked = ($rootScope.user.likes.indexOf(offer._id) > -1);
                        }.bind($scope));
                    });
                }
            });
        });
    };
    loadMatchOffer();
    //LIKE
    function like(offer) {
        var data = {}
        data.like = offer._id
        studentService.like($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.push(offer._id);
            offer.isLiked = true;
            loadSkill();
        });
    };
    //UNLIKE
    function unlike(offer) {
        var data = {}
        data.unlike = offer._id
        studentService.unlike($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.splice($rootScope.user.likes.indexOf(offer._id), 1);
            offer.isLiked = false;
            loadSkill();
            loadMatchOffer();
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

    //STUDENT BOOK INFO
    studentService.getInfo().then(function (res) {
        $scope.bookInfo = res.data;
    })
}