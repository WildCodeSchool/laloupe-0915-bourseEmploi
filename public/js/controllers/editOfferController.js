function editOfferController($scope, $location, offerService, $anchorScroll, skillService, $rootScope, $routeParams) {

    function loadSkill() {
        offerService.getOfferbyId($routeParams.id).then(function (res) {
            $scope.skillOffer = res.data.skills;
            $scope.idOffer = res.data._id;
            console.log(res.data.skills);

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
                    console.log(dataSkilled);
                });
                $scope.showSkill = true;
            });

            //Vérification et ajout de la valeur de l'input
            function updateSkill(array, up) {
                $scope.errorTyping = true;
                $scope.offerSkills.forEach(function (skill) {
                    //console.log(skill.title);
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
        offerService.update(data).then(function (res) {
            if (!res.data) {} else {

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
        offerService.update(data).then(function (res) {
            if (!res.data) {} else {

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
        offerService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour...
    $scope.update5 = function () {
        var data = {};
        data.description = $scope.description;
        data.responsability = $scope.responsability;
        data.wildSide = $scope.wildSide;
        offerService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $anchorScroll.yOffset = 20;
    $scope.scrollTo = function (id) {
        $scope.activesubmenu = "#" + id;
        $anchorScroll(id);
    }

}