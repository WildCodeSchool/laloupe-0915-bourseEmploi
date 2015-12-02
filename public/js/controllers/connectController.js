function connectController($scope, $rootScope, $location, connectService){

    $scope.checkedR = function(){
        $scope.loginR = !$scope.loginR;
        $scope.loginE = false;
        if($scope.loginR == true || $scope.loginE == true){
            $scope.hideAccueil = true;
        } else {
             $scope.hideAccueil = false;
        }
    }
    
    $scope.checkedE = function(){
        $scope.loginE = !$scope.loginE;
        $scope.loginR = false;
        if($scope.loginR == true || $scope.loginE == true){
            $scope.hideAccueil = true;
        } else {
             $scope.hideAccueil = false;
        }
    }
    
    
	$scope.connect = function(){
		connectService.connect($scope.user).then(function(res){
			$rootScope.user = res.data;
			$location.path('/homeStudent');
		}).catch(function(){
			$rootScope.loginMessage.title = "Erreur de connexion";
			$rootScope.loginMessage.message = 'E-mail et/ou mot de passe incorrecte';
		});
	}


     $scope.connectSignUpRecruiter = function(){
        $location.path('/connectRecruiter');
    }
        
}