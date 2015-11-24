function formOfferController($scope, $location, $filter, offerService, skillService){
    //JS pour les popups d'aides
    $(function () {
    $('[data-toggle="popover"]').popover()
    });
    
    $scope.referent = true;
    
    $scope.offerSkills  = [{"id":1, "title":"JAVASCRIPT"}, {"id":2, "title":"RUBY"}, {"id":3, "title":"PHP"}];
    console.log();
    console.log();

    //Init de la fonctionnalitée: ajout des Tags compétences
    $scope.showSkill = false;
    var dataSkill = [];
    $scope.listSkills = dataSkill;
    
    //Vérification et ajout de la valeur de l'input
    function updateSkill(array, up) {
    $scope.errorTyping = true;
    $scope.offerSkills.forEach(function(skill){
        console.log(skill.title);
        if (up == skill.title){
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
    $scope.add = function(){
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
    return dataSkill.splice(id, 1); 
    }
    
    //Envoi des données du formulaire
    $scope.send = function(){
    var popo = dataSkill;
    var data = {};
        data.name = $scope.referentName;
        data.email = $scope.referentMail;
        data.tel = $scope.referentPhone;
        data.title = $scope.offerTitle; 
        data.type = $scope.offerContract;
        data.experience = $scope.offerXP; 
        data.salary = $scope.offerSalary;
        data.skill = popo;
        data.description = $scope.offerDescription;
        data.responsability = $scope.offerResp;
        data.why = $scope.offerWhy;
        
        offerService.create(data).then(function(res){ 
        console.log(res.data);
            
        $location.path('/homeRecruiter');
        });
    }
}