function popupController($scope, recruiterService, $rootScope) {

    $scope.step = 1;
    console.log($scope.step);
    $scope.before = function () {
        $scope.step -= 1;
    };
    $scope.after = function () {
        $scope.step += 1;
        console.log($scope.step);
    }

    $scope.ischecked = false;
    $scope.checked = function () {
        $scope.ischecked = !$scope.ischecked;
    };

    $scope.Go = function () {
        if ($scope.ischecked == true) {
            var data = {}
            data.firstConnect = false
            recruiterService.update($rootScope.user._id, data).then(function (res) {
                $rootScope.user.firstConnect = false;
                $scope.step = 1;
            });
        } else {
            $rootScope.user.firstConnect = false;
            $scope.step = 1;
        }
    }
};