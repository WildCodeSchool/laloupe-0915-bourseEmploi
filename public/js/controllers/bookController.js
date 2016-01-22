function bookController($scope, $location, studentService, $rootScope, skillService, schoolPromoService, recruiterService) {


    $scope.school = "";

    $scope.promosFilter = function (promo) {
        return promo.schoolId == $scope.school;
    }

    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    console.log($rootScope.user.likes);

    //Chargement du modèle skills
    function loadSkill() {
        skillService.get().then(function (res) {
            $scope.skills = res.data;
        })
    }
    loadSkill();

    //Format des dates
    $scope.shortDate = function (date) {
        moment.locale('fr');
        return moment(date).format('MMM YYYY');
    }

    //Mise a zero des filtres
    $scope.resetFilter = function () {
        $scope.region = null;
        $scope.querySkill = null;
        $scope.school = null;
        $scope.promo = null;
        $scope.status = null;
        $scope.situation = null;
    }

    //Chargement des promos
    function loadPromos() {
        schoolPromoService.getPromo().then(function (res) {
            $scope.promos = res.data;
            console.log(res.data);
        });
        schoolPromoService.getSchool().then(function (res) {
            $scope.schools = res.data;
            console.log(res.data);
        });
    }
    loadPromos();

    $scope.$watch('$viewContentLoaded', function () {
        studentService.getAll().then(function (res) {
            $scope.students = res.data;
            //CHECK IS lIKED
            $scope.students.forEach(function (student) {
                student.isLiked = ($rootScope.user.likes.indexOf(student._id) > -1);
            }.bind($scope));
            console.log(console.log($scope.students));
        });
    });

    //Bouton de filtre des students
    $scope.studentFiltered = function () {
        var data = {};
        data.school = $scope.school;
        data.promos = $scope.promo;
        data.region = $scope.region;
        data.skill = $scope.querySkill;
        data.status = $scope.status;
        data.situation = $scope.situation;
        console.log($scope.promo);
        studentService.getStudentFiltered(data).then(function (res) {
            console.log(res.data);
            $scope.students = res.data;
            //CHECK IS lIKED
            $scope.students.forEach(function (student) {
                student.isLiked = ($rootScope.user.likes.indexOf(student._id) > -1);
            }.bind($scope));
        });
    }

    //RECRUITER'S LIKE UPDATE IN ROOTSCOPE
    recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
        $scope.recruiter = res.data
        var studentliked = [];
        $scope.recruiter.likes.forEach(function (like) {
            studentliked.push(like);
        }.bind($scope));
        /*        console.log(studentliked);*/
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