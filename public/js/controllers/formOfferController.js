function formOfferController($scope, $location, offerService, skillService){
    //JS pour les popups d'aides
    $(function () {
    $('[data-toggle="popover"]').popover()
    });
    
    $scope.referent = true;
    
    $scope.offerSkills  = ["Javascript", "PHP", "Ruby", "Jquery", "Java"];
    $scope.showSkill = false;
    
    //Ajout des Tags compétences
    $scope.error = false;
    var dataSkill = [];
    $scope.listSkills = dataSkill;
    $scope.add = function(){ 
        $scope.error = false;
        var verif = false;
        if (dataSkill.length == 0) {
            dataSkill.push($scope.chooseSkill);
        } else {
        for (var i = 0, l = dataSkill.length; i < l; i++) {
            console.log(i);
            if ($scope.chooseSkill != dataSkill[i]) {
                verif = true;
                console.log(dataSkill[i]);
            } else { 
                $scope.error = "Vous avez déjà choisi ce Tag !";
                $scope.chooseSkill = "";
            return false;                
            }
        }
            if (verif = true){
                dataSkill.push($scope.chooseSkill);
            }
        }
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
        
        console.log(data);
        
        offerService.create(data).then(function(res){ 
        console.log(res.data);
            
        $location.path('/homeRecruiter');
        });
    }
}