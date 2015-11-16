function formOfferController($scope, $location, offerService){
    $(function () {
  $('[data-toggle="popover"]').popover()
})
    $scope.referent = true;
    
    
    $scope.send = function(){
    
    var data = {};
        data.name = $scope.referentName;
        data.email = $scope.referentMail;
        data.tel = $scope.referentPhone;
        data.title = $scope.offerTitle; 
        data.type = $scope.offerContract;
        data.experience = $scope.offerXP; 
        data.salary = $scope.offerSalary;
        data.skill = $scope.offerSkill;
        data.description = $scope.offerDescription;
        data.responsability = $scope.offerResp;
        data.why = $scope.offerWhy;
        console.log(data);
        offerService.create(data).then(function(res){ 
        console.log(res.data);
        $location.path('/login');
        });
    }
}