function editBookStudentController($scope, $location, $anchorScroll, $rootScope, $routeParams, studentService, offerService, skillService) {

    function loadStudent() {
        studentService.getUserbyId($rootScope.user._id).then(function (res) {

            $scope.student = res.data;
            $scope.student.birthDate = moment(res.data.birthDate, "YYYY-MM-DDTHH:mm:ssZ").toDate();
        })
    }
    loadStudent();

    function loadPassword() {
        studentService.getPassword($rootScope.user._id).then(function (res) {

            $scope.student = res.data;
            console.log($scope.student);
        })
    }
    loadPassword();


    //Init preview
    var preview = document.querySelector('#preview');
    var preview2 = document.querySelector('#preview2');
    preview.style.display = 'block';

    //Upload photo
    $scope.previewFile = function (a) {
        var file = document.querySelector('#logo').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.style.display = 'block';
            preview.src = reader.result;
            $scope.logo = reader.result;
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    //Suppression du logo
    $scope.deleteLogo = function () {
        var data = {};
        data.logo = "";
        studentService.update($rootScope.user._id, data).then(function (res) {
            alert('ok');
        });
    }

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

    //Mise a jour des photos
    $scope.updateLogo = function () {
        var data = {};
        data.logo = $scope.logo;
        studentService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour infos personnelles
    $scope.update1 = function () {
        var data = {};
        data.firstName = $scope.student.firstName;
        data.name = $scope.student.name;
        data.birthDate = $scope.student.birthDate;
        data.gender = $scope.student.gender;
        data.email = $scope.student.email;
        data.phone = $scope.student.phone;
        data.city = $scope.student.city;
        data.region = $scope.student.region;
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
        data.situation = $scope.student.situation;
        data.status = $scope.student.status;
        data.mobility = $scope.student.mobility;
        data.languages = $scope.student.languages;
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
        data.wildSide = $scope.student.wildSide;
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
            console.log(current);
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
        data.monthStart = exp.experience.monthStart;
        data.yearStart = exp.experience.yearStart;
        data.monthEnd = exp.experience.monthEnd;
        data.yearEnd = exp.experience.yearEnd;
        data.detailsExp = exp.experience.detailsExp;
        studentService.updateExperience(exp.experience._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                console.log(exp);
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
        data.monthStart = form.formation.monthStart;
        data.yearStart = form.formation.yearStart;
        data.monthEnd = form.formation.monthEnd;
        data.yearEnd = form.formation.yearEnd;
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
        data.hobbies = $scope.student.hobbies;
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
        console.log(data);
        data.studentId = $rootScope.user._id;
        data.job = $scope.job;
        data.company = $scope.company;
        data.contract = $scope.contract;
        data.city = $scope.city;
        data.country = $scope.country;
        data.monthStart = $scope.monthStart;
        data.yearStart = $scope.yearStart;
        data.monthEnd = $scope.monthEnd;
        data.yearEnd = $scope.yearEnd;
        data.detailsExp = $scope.detailsExp;
        studentService.newExperience(data).then(function (res) {
            if (!res.data) {
                console.log(res.data);
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
        data.monthStart = $scope.monthStart;
        data.yearStart = $scope.yearStart;
        data.monthEnd = $scope.monthEnd;
        data.yearEnd = $scope.yearEnd;
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

    $anchorScroll.yOffset = 20;
    $scope.scrollTo = function (id) {
        $scope.activesubmenu = "#" + id;
        $anchorScroll(id);
    }

    var years = {};
    var year = moment().format("YYYY")
    years[0] = year;
    for (var i = 1; i < 101; i++) {
        years[i] = year - i;
    }
    $scope.years = years;
}