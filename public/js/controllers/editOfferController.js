function editOfferController($scope, $location, offerService, $anchorScroll, skillService, $rootScope, $routeParams) {

    function loadOffer() {
        offerService.getOfferbyId($routeParams.id).then(function (res) {
            $scope.referentName = res.data.referentName;
            $scope.referentEmail = res.data.referentEmail;
            $scope.referentPhone = res.data.referentPhone;
            $scope.country = res.data.country;
            $scope.city = res.data.city;
            $scope.zipCode = res.data.zipCode;
            $scope.address = res.data.address;
            $scope.title = res.data.title;
            $scope.contract = res.data.contract;
            $scope.experience = res.data.experience;
            $scope.salary = res.data.salary;
            $scope.description = res.data.description;
            $scope.responsability = res.data.responsability;
        });
    }
    loadOffer();

    function loadSkill() {
        offerService.getOfferbyId($routeParams.id).then(function (res) {
            $scope.skillOffer = res.data.skills;
            $scope.idOffer = res.data._id;

            /****   CREATION TAGS ******/
            //Import des compétences de shéma "skills"
            skillService.get().then(function (res) {
                $scope.offerSkills = res.data;
            });

            //Init de la fonctionnalitée
            $scope.showSkill = false;
            var dataSkilled = [];
            $scope.listSkills = dataSkilled;

            //Ajout des skills deja présent dans l'offre
            $scope.$watch('$viewContentLoaded', function () {
                // traitement à effectuer au chargement de la page
                $scope.skillOffer.forEach(function (skill) {
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
                console.log("choix user: " + up);
                updateSkill(dataSkilled, up);
                //Affichage du skill et champ vide
                //$scope.showSkill = true;
                $scope.chooseSkill = "";
            }

            //Suppression des Tags
            $scope.deleteSkill = function deleteASkill(id) {
                var idDeletedSkill = dataSkilled.indexOf(id);
                console.log("le skill " + $scope.listSkills + " sera effacé");
                return dataSkilled.splice(idDeletedSkill, 1);
            }
        });
    }
    loadSkill();

    //Mise a jour infos personnelles
    $scope.update1 = function () {
        var data = {};
        data.referentName = $scope.referentName;
        data.referentEmail = $scope.referentEmail;
        data.referentPhone = $scope.referentPhone;
        offerService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour coordonnées
    $scope.update2 = function () {
        var data = {};
        data.country = $scope.country;
        data.city = $scope.city;
        data.zipCode = $scope.zipCode;
        data.address = $scope.address;
        offerService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour détail offre
    $scope.update3 = function () {
        var data = {};
        data.title = $scope.title;
        data.contract = $scope.contract;
        data.experience = $scope.experience;
        data.salary = $scope.salary;
        offerService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour des skills
    $scope.update4 = function () {
        var data = {};
        var idSkill = [];
        data.skills = idSkill;
        for (var i = 0; i < $scope.offerSkills.length; i++) {
            var objs = {
                skill: ""
            };
            var current = $scope.offerSkills[i].title;
            console.log(current);
            $scope.listSkills.forEach(function (skill) {
                if (current === skill) {
                    objs.skill = $scope.offerSkills[i]._id;
                    idSkill.push(objs);
                }
            });
        }
        offerService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour...
    $scope.update5 = function () {
        var data = {};
        data.description = $scope.description;
        data.responsability = $scope.responsability;
        offerService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    // ancre pour le menu
    $anchorScroll.yOffset = 20;
    $scope.scrollTo = function (id) {
        $scope.activesubmenu = "#" + id;
        $anchorScroll(id);
    }

}