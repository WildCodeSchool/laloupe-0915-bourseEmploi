function homeRctrController($scope){

$scope.currentoffers = true;
$scope.comingoffers = false;
$scope.expiredoffers = false;
    
$scope.show1 = function(){
    $scope.currentoffers = true;
    $scope.comingoffers = false;
    $scope.expiredoffers = false;    
}

$scope.show2 = function(){
    $scope.currentoffers = false;
    $scope.comingoffers = true;
    $scope.expiredoffers = false;    
}

$scope.show3 = function(){
    $scope.currentoffers = false;
    $scope.comingoffers = false;
    $scope.expiredoffers = true;    
}

}