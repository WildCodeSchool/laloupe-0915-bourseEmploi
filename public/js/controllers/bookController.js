function bookController($scope, $location, studentService) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //GET STUDENTS
    studentService.getAll('Student').then(function (res) {
        $scope.students = res.data
        console.log(res.data);
    });

    //LINK TO CV STUDENT
    $scope.goToStudent = function (student) {
        $location.path('/book/' + student._id);
    }

};