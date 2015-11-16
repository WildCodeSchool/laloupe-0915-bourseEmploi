function connectController($scope, $rootScope, $location, connectService){

    $scope.checkedR = function(){
        $scope.loginR = !$scope.loginR;
        $scope.loginE = false;
        
    }
    
    $scope.checkedE = function(){
        $scope.loginE = !$scope.loginE;
        $scope.loginR = false;
    }
    
	$scope.connect = function(){
		connectService.connect($scope.user).then(function(res){
			$rootScope.user = res.data;
			$location.path('/todos');
		}).catch(function(){
			$rootScope.loginMessage.title = "Connexion error";
			$rootScope.loginMessage.message = 'Error login or password';
		});
	}
}