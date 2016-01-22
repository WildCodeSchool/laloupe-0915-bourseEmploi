function adminBoardController($scope, studentService, recruiterService, $rootScope, $http) {

    var recruiter = [];
    $scope.recruiters = recruiter;

    function loadUsers() {
        recruiterService.getAll().then(function (res) {
            res.data.forEach(function (data) {
                if (data.admin === false)
                    recruiter.push(data);
                console.log(res.data);
            });
        });
    }
    loadUsers();

}