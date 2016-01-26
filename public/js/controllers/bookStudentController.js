function bookStudentController($scope, $rootScope, skillService, $routeParams, studentService, $location, recruiterService) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    var selectUser = $routeParams.id;
    $scope.ifStudent = false;

    //RECRUITER'S LIKE UPDATE IN ROOTSCOPE
    recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
        $scope.recruiter = res.data
        var studentliked = [];
        $scope.recruiter.likes.forEach(function (like) {
            studentliked.push(like);
        }.bind($scope));
        $rootScope.user.likes = studentliked;
        //LOAD STUDENT
        studentService.getUserbyId(selectUser).then(function (res) {
            $scope.student = res.data;
            $scope.studentSkill = res.data.skills;
            //CHECK IS lIKED
            $scope.student.isLiked = ($rootScope.user.likes.indexOf($scope.student._id) > -1);

            //Cacher les actions d'édition selon le type
            if ($rootScope.user._type === 'Student' && $rootScope.user._id === selectUser || $rootScope.user.admin === true)
                $scope.ifStudent = true;

            //Afichage des dates
            $scope.born = moment().diff($scope.student.birthDate, "years");
            $scope.calculDate = function (date) {
                return moment(date).format('YYYY');
            }

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
    });

    //LIKE
    function like(student) {
        var data = {}
        data.like = student._id
        recruiterService.like($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.push(student._id);
            student.isLiked = true;
        });
    };
    //UNLIKE
    function unlike(student) {
        var data = {}
        data.unlike = student._id
        recruiterService.unlike($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.splice($rootScope.user.likes.indexOf(student._id), 1);
            student.isLiked = false;
        });
    };
    //LIKE OR UNLIKE
    $scope.likeClick = function (student) {
        if ($rootScope.user.likes.indexOf(student._id) > -1) {
            unlike(student);
        } else {
            like(student);
        }
    }

    $scope.goToEdit = function (d) {
        $("body").removeClass("modal-open");
        $(".modal-backdrop").hide();
        $location.path('/editBook/' + $routeParams.id);
    }

    $scope.modification = function () {
        $location.path("/editBook/" + $routeParams.id)
    }


};