function mainController($scope, $rootScope, $http, todoService) {
	$scope.title = "Todo List";

	function load(){
		todoService.get($rootScope.user).then(function(res){
			$scope.todos = res.data;
		});
	}

	$scope.add = function(){
		var data = {};
		data.description = $scope.description;

		todoService.create(data, $rootScope.user).then(function(res){
			load();
		});

		$scope.description = "";
	}

	$scope.update = function(todo){
		todoService.update(todo._id, todo, $rootScope.user).then(function(res){
			load();
		});
	}

	$scope.delete = function(todo){
		todoService.delete(todo._id, $rootScope.user).then(function(res){
			load();
		});
	}


	load();
}