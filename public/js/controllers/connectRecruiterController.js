function connectRecruiterController($scope, connectRecruiterService){
    
    $scope.send = function(){
		var data = {};
        data.companyName = $scope.companyName;
        data.companySize = $scope.companySize;
        data.businessSector = $scope.businessSector;
        data.companyDescription = $scope.companyDescription;
        data.function = $scope.function;
        data.country = $scope.country;
        data.region = $scope.region;
        data.city = $scope.city;
        data.adress = $scope.adress;
        data.website = $scope.website;
        data.socialNetwork = $scope.socialNetwork;
        data.email = $scope.email;
        data.phoneNumber = $scope.phoneNumber;
        
        connectRecruiterService.create(data).then(function(res){
            
        });

    }


}