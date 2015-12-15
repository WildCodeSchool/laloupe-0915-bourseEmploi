function editBookStudentController($scope, $location, $anchorScroll, $rootScope, $routeParams, studentService) {

    /*function () {
        studentService.getUserbyId().then(function (res) {
            $scope.firstName = .firstName;
            $scope.name = .name;
            $scope.birthDate = .birthDate;
            $scope.gender = .gender;
            $scope.email = .email;
            $scope.phone = .phone;
            $scope.situation = .situation;
            $scope.status = .status;
            $scope.mobility = .mobility;
            $scope.wildSide = .wildSide;
        })


        $scope.company = $rootScope.user.company;
        $scope.contract = $rootScope.user.contract;
        $scope.city = $rootScope.user.city;
        $scope.country = $rootScope.user.country;
        $scope.startDate = $rootScope.user.startDate;
        $scope.endDate = $rootScope.user.endDate;
        $scope.detailsExp = $rootScope.user.detailsExp;

        $scope.title = $rootScope.user.title;
        $scope.school = $rootScope.user.school;
        $scope.city = $rootScope.user.city;
        $scope.country = $rootScope.user.country;
        $scope.startDate = $rootScope.user.startDate;
        $scope.endDate = $rootScope.user.endDate;
        $scope.description = $rootScope.user.description;
    }*/

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
        data.firstName = $scope.firstName;
        data.name = $scope.name;
        data.birthDate = $scope.birthDate;
        data.gender = $scope.gender;
        data.email = $scope.email;
        data.phone = $scope.phone;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour coordonnées
    $scope.update2 = function () {
        var data = {};
        data.situation = $scope.situation;
        data.status = $scope.status;
        data.mobility = $scope.mobility;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour détail offre
    $scope.update3 = function () {
        var data = {};
        data.wildSide = $scope.wildSide;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour...
    $scope.update5 = function () {
        var data = {};
        data.job = $scope.job;
        data.company = $scope.company;
        data.contract = $scope.contract;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.detailsExp = $scope.detailsExp;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.update6 = function () {
        var data = {};
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.update7 = function () {
        var data = {};
        data.hobbies = $scope.hobbies;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.createExperience = function () {
        var data = {};
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        studentService.create(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.createFormation = function () {
        var data = {};
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        studentService.create(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.createHobbies = function () {
        var data = {};
        data.hobbies = $scope.hobbies;
        studentService.create(data).then(function (res) {
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