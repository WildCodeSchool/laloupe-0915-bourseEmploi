function bookStudentController($http, $scope, $rootScope, studentService) {

    function loadStudent(){
        studentService.getUserById($rootScope.user._id).then(function(res){
            console.log(res.data);
            $scope.student = res.data;
        })
    }
    loadStudent();

    //INITIALISATION ICON
    $scope.facebookIf = true;
    $scope.twitterIf = true;
    $scope.linkedinIf = true;
    $scope.instagramIf = true;
    $scope.phoneIf = true;
    $scope.mailIf = true;
    $scope.websiteIf = true;
    $scope.githubIf = true;


    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}