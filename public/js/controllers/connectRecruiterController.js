
function connectRecruiterController($scope, $location, connectRecruiterService){
    
     $(function () {
       $('[data-toggle="popover"]').popover()
   });
    
    $scope.logo = {};
    
    $scope.send = function(){
		var data = {};
        data.companyName = $scope.companyName;
        data.companySize = $scope.companySize;
        data.logo = typeof $scope.logo == 'object' ? "" :$scope.logo ;
        data.businessSector = $scope.businessSector;
        data.companyDescription = $scope.companyDescription;
        data.functionReferent = $scope.functionReferent;
        data.country = $scope.country;
        data.region = $scope.region;
        data.city = $scope.city;
        data.address = $scope.adress;
        data.website = $scope.website;
        data.facebook = $scope.facebook;
        data.twitter = $scope.twitter;
        data.instagram = $scope.instagram;
        data.linkedin = $scope.linkedin;
        data.tilder = $scope.tilder;
        data.email = $scope.email;
        data.tel = $scope.tel;
        
        connectRecruiterService.create(data).then(function(res){
            
            if (!res.data){
                console.log(data);
				$scope.incompleteError = true;
			}
			//ERREUR
			else{
				alert("compte crée");
                $location.path('/homeRecruiter');
			}
            
        });

    }


$scope.previewFile = function() {
     var preview    = document.querySelector('#preview');
     var file    = document.querySelector('input[type=file]').files[0];
     var reader  = new FileReader();
     reader.onloadend = function () {
       preview.src = reader.result;
       $scope.logo = reader.result; } 
      if (file) {
       reader.readAsDataURL(file);
    } else {
       preview.src = "";
    }
  }

}
