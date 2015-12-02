function formOfferController($scope, $location, $filter, offerService, skillService) {
    //JS pour les popups d'aides
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    $scope.referent = false;

    /****   CREATION TAGS ******/

    //Import des compétences de shéma "skills"
    skillService.get().then(function (res) {
        $scope.offerSkills = res.data;
    });

    //Init de la fonctionnalitée
    $scope.showSkill = false;
    var dataSkill = [];
    $scope.listSkills = dataSkill;

    //Vérification et ajout de la valeur de l'input
    function updateSkill(array, up) {
        $scope.errorTyping = true;
        $scope.offerSkills.forEach(function (skill) {
            console.log(skill.title);
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

    //Lancement fonction de vérif au clic
    $scope.add = function () {
        $scope.errorChoice = false;
        $scope.errorTyping = false;
        var up = $scope.chooseSkill.toUpperCase();
        updateSkill(dataSkill, up);
        //Affichage du skill et champ vide
        $scope.showSkill = true;
        $scope.chooseSkill = "";
    }

    //Suppression des Tags
    $scope.deleteSkill = function deleteASkill(id) {
        var idDeletedSkill = dataSkill.indexOf(id);
        console.log(idDeletedSkill);
        return dataSkill.splice(idDeletedSkill, 1);
    }

    //Envoi des données du formulaire
    $scope.offerDate = new Date();
    $scope.send = function () {
        var data = {};
        data.name = $scope.referentName;
        data.email = $scope.referentMail;
        data.tel = $scope.referentPhone;
        data.title = $scope.offerTitle;
        data.type = $scope.offerContract;
        data.experience = $scope.offerXP;
        data.salary = $scope.offerSalary;
        data.skill = dataSkill;
        data.description = $scope.offerDescription;
        data.responsability = $scope.offerResp;
        data.why = $scope.offerWhy;
        data.address = $scope.referentAddress;
        data.city = $scope.referentCity;
        data.country = $scope.referentCountry;
        data.zipCode = $scope.referentZipCode;
        //data.idRecruiter = $rootScope.id;
        data.startDate = $scope.offerDate;
        data.endDate = $scope.offerDate;
        console.log(data);

        offerService.create(data).then(function (res) {
            console.log(data);
            //ERREUR
            if (!res.data) {
                console.log(data);
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
    $scope.Dday = moment().format('YYYY-MM-DD');
}