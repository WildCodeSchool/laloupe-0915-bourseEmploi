function connectController($scope, $rootScope, $location, connectService) {
    $scope.checkedR = function () {
        $scope.user = undefined;
        $scope.loginR = !$scope.loginR;
        $scope.loginE = false;
        if ($scope.loginR == true || $scope.loginE == true) {
            $scope.hideAccueil = true;
        } else {
            $scope.hideAccueil = false;
        }
    }

    $scope.checkedE = function () {
        $scope.user = undefined;
        $scope.loginE = !$scope.loginE;
        $scope.loginR = false;
        if ($scope.loginR == true || $scope.loginE == true) {
            $scope.hideAccueil = true;
        } else {
            $scope.hideAccueil = false;
        }
    }

    $scope.connect = function () {
        connectService.connect($scope.user).then(function (res) {
            $rootScope.user = res.data;
            console.log(res.data);
            if (res.data.user._type != "Recruiter")
                $location.path('/homeStudent');
            else
                $location.path('/homeRecruiter');
        }).catch(function () {
            $rootScope.loginMessage.title = "Erreur de connexion";
            $rootScope.loginMessage.message = 'E-mail et/ou mot de passe incorrect';
        });
    }
}