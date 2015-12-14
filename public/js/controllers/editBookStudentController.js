function editBookStudentController($scope, experienceService, studentService, formationService) {

    //Mise a jour infos personnelles
    $scope.update1 = function () {
        var data = {};
        data.firstName = $scope.firstName;
        data.name = $scope.name;
        data.birthDate = $scope.birthDate;
        data.gender = $scope.gender;
        data.email = $scope.email;
        data.phone = $scope.phone;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour coordonnées
    $scope.update2 = function () {
        var data = {};
        data.situation = $scope.situation;
        data.status = $scope.status;
        data.mobility = $scope.mobility;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour détail offre
    $scope.update3 = function () {
        var data = {};
        data.wildSide = $scope.wildSide;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    //Mise a jour...
    $scope.update5 = function () {
        var data = {};
        data.job = $scope.job;
        data.company = $scope.company;
        data.contract = $scope.contract;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.detailsExp = $scope.detailsExp;
        experienceService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.update6 = function () {
        var data = {};
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        formationService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.update7 = function () {
        var data = {};
        data.hobbies = $scope.hobbies;
        studentService.update(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.createExperience = function () {
        var data = {};
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        experienceService.create(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.createformation = function () {
        var data = {};
        data.title = $scope.title;
        data.school = $scope.school;
        data.city = $scope.city;
        data.country = $scope.country;
        data.startDate = $scope.startDate;
        data.endDate = $scope.endDate;
        data.description = $scope.description;
        formationService.create(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }

    $scope.createHobbies = function () {
        var data = {};
        data.hobbies = $scope.hobbies;
        formationService.create(data).then(function (res) {
            if (!res.data) {} else {

            }
        })
    }



}