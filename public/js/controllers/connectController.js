function connectController($scope, $rootScope, $location, connectService){

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