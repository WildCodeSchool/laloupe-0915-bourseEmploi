function bookStudentController($scope) {

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
};