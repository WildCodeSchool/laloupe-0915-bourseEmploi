function popupController($scope, recruiterService, $rootScope) {

    $scope.step = 1;
    $scope.help = false;
    console.log($scope.step);
    $scope.before = function () {
        $scope.step -= 1;
    };
    $scope.after = function () {
        $scope.step += 1;
        console.log($scope.step);
    }

    $scope.Go = function () {
        var data = {}
        data.firstConnect = false
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            $rootScope.user.firstConnect = false;
            $scope.step = 1;
            $scope.help = false;
        });
    };

    $scope.replay = function () {
        $scope.help = true;
        console.log($scope.help)
    }

}