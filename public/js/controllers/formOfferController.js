function formOfferController($scope, $location, $filter, $rootScope, offerService, skillService) {
    //JS pour les popups d'aides
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    $scope.empty = true;

    var referentInfo = function () {
        if ($scope.empty == true) {
            $scope.country = $rootScope.user.country;
            $scope.city = $rootScope.user.city;
            $scope.address = $rootScope.user.address;
            $scope.referentPhone = $rootScope.user.referentPhone;
            $scope.referentEmail = $rootScope.user.email;
            $scope.zipCode = $rootScope.user.zipCode;
        } else {
            $scope.country = null;
            $scope.city = null;
            $scope.address = null;
            $scope.referentPhone = null;
            $scope.referentEmail = null;
            $scope.zipCode = null;
        }
    }
    referentInfo();

    $scope.checkEmpty = function () {
        $scope.empty = !$scope.empty;
        referentInfo();
    }

    $scope.noSalary = true;

    var salary = '';

    $scope.checkSalary = function () {
        if ($scope.noSalary === true) {
            salary = 'Non précisé';
        } else {
            salary = $scope.salaryNumber + ' ' + $scope.salaryPeriod;
        };
        console.log(salary)
    }
    $scope.checkSalary();

    $scope.disabledSalary = function () {
        $scope.noSalary = !$scope.noSalary
        $scope.checkSalary()
    }

    var salary = '';




    /****   CREATION TAGS ******/
    //Import des compétences de shéma "skills"
    skillService.get().then(function (res) {
        $scope.offerSkills = res.data;
        console.log($scope.offerSkills);
    });

    //Init de la fonctionnalitée
    $scope.showSkill = false;
    var dataSkill = [];
    $scope.listSkills = dataSkill;

    //Vérification et ajout de la valeur de l'input
    function updateSkill(array, up) {
        $scope.errorTyping = true;
        $scope.offerSkills.forEach(function (skill) {
            //console.log(skill.title);
            if (up == skill.title) {
                $scope.errorTyping = false;
            }
        });
        if (!$scope.errorTyping && dataSkill.indexOf(up) === -1) {
            dataSkill.push(up);
            console.log('Le nouveau tableau est : ' + dataSkill);
        } else if (dataSkill.indexOf(up) > -1) {
            $scope.errorChoice = true;
        }
    }

    //Lancement de la fonction  precedente au clic
    $scope.add = function () {
        $scope.errorChoice = false;
        $scope.errorTyping = false;
        var up = $scope.chooseSkill.toUpperCase();
        console.log($scope.chooseSkill);
        updateSkill(dataSkill, up);
        //Affichage du skill et champ vide
        $scope.showSkill = true;
        $scope.chooseSkill = "";
    }

    //Suppression des Tags
    $scope.deleteSkill = function deleteASkill(id) {
        var idDeletedSkill = dataSkill.indexOf(id);
        console.log($scope.listSkills);
        return dataSkill.splice(idDeletedSkill, 1);
    }

    //Envoi des données du formulaire
    $scope.startDate = new Date();
    $scope.send = function () {
        var idSkill = [];
        var data = {};
        data = $scope.offer;
        data.zipCode = $scope.zipCode;
        data.country = $scope.country;
        data.city = $scope.city;
        data.address = $scope.address;
        data.skills = idSkill;
        data.referentPhone = $scope.referentPhone;
        data.referentEmail = $scope.referentEmail;
        data.referentId = $rootScope.user._id;
        data.salary = salary;
        console.log(data.referentId);
        data.endDate = moment($scope.startDate).add(90, 'days');
        data.startDate = moment($scope.startDate);

        //Comparaison des skills choisi et existant( pour envoi Ids)
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

        offerService.create(data).then(function (res) {
            //ERREUR
            if (!res.data) {
                $scope.incompleteError = true;
            }
            //SUCCES
            else {
                alert("offre crée");
                $location.path('/homeRecruiter');
            }
        });
    }

    // Date du jour
    $scope.Dday = moment();
}