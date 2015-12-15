function editBookStudentController($scope, $location, $anchorScroll, $rootScope, $routeParams, studentService, offerService, skillService) {

    function loadStudent() {
        studentService.getUserbyId($rootScope._id).then(function (res) {
            $scope.firstName = res.data.firstName;
            $scope.name = res.data.name;
            $scope.birthDate = res.data.birthDate;
            $scope.gender = res.data.gender;
            $scope.email = res.data.email;
            $scope.phone = res.data.phone;
            $scope.situation = res.data.situation;
            $scope.status = res.data.status;
            $scope.mobility = res.data.mobility;
            $scope.wildSide = res.data.wildSide;

            $scope.company = res.data.company;
            $scope.contract = res.data.contract;
            $scope.city = res.data.city;
            $scope.country = res.data.country;
            $scope.startDate = res.data.startDate;
            $scope.endDate = res.data.endDate;
            $scope.detailsExp = res.data.detailsExp;

            $scope.title = res.data.title;
            $scope.school = res.data.school;
            $scope.city = res.data.city;
            $scope.country = res.data.country;
            $scope.startDate = res.data.startDate;
            $scope.endDate = res.data.endDate;
            $scope.description = res.data.description;
        })
    }
    loadStudent();

    function loadSkill() {
        offerService.getOfferbyId($routeParams.id).then(function (res) {
            $scope.skillOffer = res.data.skills;
            $scope.idOffer = res.data._id;

            //* * * CREATION TAGS * * * * *
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
        data.firstName = $scope.firstName;
        data.name = $scope.name;
        data.birthDate = $scope.birthDate;
        data.gender = $scope.gender;
        data.email = $scope.email;
        data.phone = $scope.phone;
        studentService.update(data).then(function (res) {
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
        data.situation = $scope.situation;
        data.status = $scope.status;
        data.mobility = $scope.mobility;
        studentService.update(data).then(function (res) {
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
        data.wildSide = $scope.wildSide;
        studentService.update(data).then(function (res) {
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
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
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
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.update7 = function () {
        var data = {};
        data.hobbies = $scope.hobbies;
        studentService.update(data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
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
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
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
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.createHobbies = function () {
        var data = {};
        data.hobbies = $scope.hobbies;
        studentService.create(data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $anchorScroll.yOffset = 20;
    $scope.scrollTo = function (id) {
        $scope.activesubmenu = "#" + id;
        $anchorScroll(id);
    }
}