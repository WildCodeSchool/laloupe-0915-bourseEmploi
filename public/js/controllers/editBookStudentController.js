function editBookStudentController($scope, $location, $anchorScroll, $rootScope, $routeParams, studentService, offerService, skillService) {


    //function loadStudent() {
        studentService.getUserbyId($rootScope.user._id).then(function (res) {

            $scope.student = res.data;

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
            $scope.hobbies = res.data.hobbies;
            $scope.languages = res.data.languages;


            $scope.job = res.data.job;
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

            console.log($scope.student.formations);
        })
    //}
    //loadStudent();

    function loadSkill() {
        studentService.getUserbyId($rootScope.user._id).then(function (res) {
            $scope.skillStudent = res.data.skills;
            $scope.idStudent = res.data._id;

            /****   CREATION TAGS ******/
            //Import des compétences de shéma "skills"
            skillService.get().then(function (res) {
                $scope.studentSkills = res.data;
            });

            //Init de la fonctionnalitée
            $scope.showSkill = false;
            var dataSkilled = [];
            $scope.listSkills = dataSkilled;

            //Ajout des skills deja présent dans l'offre
            $scope.$watch('$viewContentLoaded', function () {
                // traitement à effectuer au chargement de la page
                $scope.skillStudent.forEach(function (skill) {
                    dataSkilled.push(skill.skill.title);
                });
                $scope.showSkill = true;
            });

            //Vérification et ajout de la valeur de l'input
            function updateSkill(array, up) {
                $scope.errorTyping = true;
                $scope.studentSkills.forEach(function (skill) {
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
        studentService.update($rootScope.user._id, data).then(function (res) {
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
        data.languages = $scope.languages;
        studentService.update($rootScope.user._id, data).then(function (res) {
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
        studentService.update($rootScope.user._id, data).then(function (res) {
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
        for (var i = 0; i < $scope.studentSkills.length; i++) {
            var objs = {
                skill: ""
            };
            var current = $scope.studentSkills[i].title;
            console.log(data);
            $scope.listSkills.forEach(function (skill) {
                if (current === skill) {
                    objs.skill = $scope.studentSkills[i]._id;
                    idSkill.push(objs);
                }
            });
        }
        studentService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour...
    $scope.update5 = function (exp) {
        var data = {};
        data.studentId = $rootScope.user._id;
        data.job = exp.experience.job;
        data.company = exp.experience.company;
        data.contract = exp.experience.contract;
        data.city = exp.experience.city;
        data.country = exp.experience.country;
        data.startDate = exp.experience.startDate;
        data.endDate = exp.experience.endDate;
        data.detailsExp = exp.experience.detailsExp;
        studentService.updateExperience(exp.experience._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.update6 = function (form) {
        var data = {};
        data.studentId = $rootScope.user._id;
        data.title = form.formation.title;
        data.school = form.formation.school;
        data.city = form.formation.city;
        data.country = form.formation.country;
        data.startDate = form.formation.startDate;
        data.endDate = form.formation.endDate;
        data.description = form.formation.description;
        studentService.updateFormation(form.formation._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.update7 = function () {
        var data = {};
        data.hobbies = [];
        var hobbies = $scope.hobbies.split(',');
        hobbies.forEach(function(hobby){
            data.hobbies.push(hobby);    
        });
        
        debugger
        //data.hobbies = $scope.hobbies;
        studentService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.createExperience = function () {
        var data = {};
        data.studentId = $rootScope.user._id;
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        studentService.newExperience(data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.createFormation = function () {
        var data = {};
        console.log(data);
        data.studentId = $rootScope.user._id;
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        studentService.newFormation(data).then(function (res) {
            if (!res.data) {
                console.log(res.data);
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.createHobbies = function () {
        var data = {};
        data.hobbies = $scope.hobbiesQuery;
        studentService.updateHobbie($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    $scope.createLanguages = function () {
        var data = {};
        data.languages = $scope.languagesQuery;
        studentService.updateLanguage($rootScope.user._id, data).then(function (res) {
            console.log(data);
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