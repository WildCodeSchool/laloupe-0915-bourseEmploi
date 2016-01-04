function bookController($scope, studentService) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //GET STUDENTS
    studentService.getAll('Student').then(function (res) {
        $scope.students = res.data
        console.log(res.data);
    });

};