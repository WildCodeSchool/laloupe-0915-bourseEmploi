function bookController($scope, $location, studentService, $rootScope, recruiterService) {

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    console.log($rootScope.user.likes);


    //RECRUITER'S LIKE UPDATE IN ROOTSCOPE
    recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
        $scope.recruiter = res.data
        var studentliked = [];
        $scope.recruiter.likes.forEach(function (like) {
            studentliked.push(like);
        }.bind($scope));
        console.log(studentliked);
        $rootScope.user.likes = studentliked;
    });

    //CHECK USER TYPE
    function pop() {
        var type = 'Recruiter';
        recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
            $scope.type = res.data;
            if ($scope.type._type === 'Recruiter')
                $scope.showRcrt = true;
            else
                $scope.showStudent = true;
        });
    }
    pop();

    //GET STUDENTS
    studentService.getAll('Student').then(function (res) {
        $scope.students = res.data

        //CHECK IS lIKED
        $scope.students.forEach(function (student) {
            student.isLiked = ($rootScope.user.likes.indexOf(student._id) > -1);
            console.log(student._id);
            console.log($rootScope.user.likes.indexOf(student._id))
        }.bind($scope));

    });

    //LIKE
    function like(student) {
        var data = {}
        data.like = student._id
        recruiterService.like($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.push(student._id);
            student.isLiked = true;
        });
    };
    //UNLIKE
    function unlike(student) {
        var data = {}
        data.unlike = student._id
        recruiterService.unlike($rootScope.user._id, data).then(function (res) {
            $rootScope.user.likes.splice($rootScope.user.likes.indexOf(student._id), 1);
            student.isLiked = false;
        });
    };
    //LIKE OR UNLIKE
    $scope.likeClick = function (student) {
        if ($rootScope.user.likes.indexOf(student._id) > -1) {
            unlike(student);
        } else {
            like(student);
        }
    }

    //LINK TO CV STUDENT
    $scope.goToStudent = function (student) {
        $location.path('/book/' + student._id);
    }

};