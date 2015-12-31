function homeStudentController($scope, $rootScope, geocoderService, offerService, studentService, skillService, $routeParams, $location) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

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
                    console.log('Le nouveau tableau est : ' + dataSkilled);
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
                console.log("le skill " + skill + " sera effacé");
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
            $scope.offers.forEach(function (offer) {
                var address = offer.address + ", " + offer.zipCode + " " + offer.city + ", " + offer.country;

                geocoderService.CoordinateByAdress(address).then(function (res) {
                    var lng = res.data.features[0].geometry.coordinates[0];
                    var lat = res.data.features[0].geometry.coordinates[1];

                    var marker = new L.marker([lat, lng]).addTo(map);
                    marker.bindPopup('<a href="/#/offer/' + offer._id + '"><b>' + offer.title + '</b></a><br>' + offer.city);
                });

            }.bind($scope));
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