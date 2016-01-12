function skillsController($scope, skillService) {

    function loadSkill() {
        skillService.get().then(function (res) {
            $scope.skills = res.data;
        });
    }
    loadSkill();

    $scope.newSkill = {};

    $scope.createSkill = function () {
        if ($scope.language == 'true') {
            $scope.newSkill.language = true;
        } else {
            $scope.newSkill.language = false;
        }
        skillService.checkSkill($scope.newSkill.title).then(function (res) {
            // SUCCESS
            skillService.create($scope.newSkill).then(function (res) {
                loadSkill();
                console.log($scope.newSkill)
            });
        }).catch(function (err) {
            //ERROR
            $scope.err = err.data;
            $scope.displayError = true;
        });
    };
};