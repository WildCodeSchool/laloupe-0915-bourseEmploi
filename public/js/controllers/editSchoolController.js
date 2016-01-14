function editSchoolController($scope, schoolPromoService) {
    //TOOLTIP    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    //DIPSLAY FORM
    $scope.displayCreateSchool = false;
    $scope.displayCreateClass = false;
    $scope.displayEditSchool = false;
    $scope.displayEditClass = false;
    $scope.displayCreateClassBtn = false;

    $scope.btnCreateSchool = function () {
        $scope.displayCreateSchool = !$scope.displayCreateSchool;
        $scope.displayEditSchool = false;
    }
    $scope.btnCreateClass = function () {
        $scope.displayCreateClass = !$scope.displayCreateClass;
        $scope.displayEditClass = false;
    }
    $scope.btnEditSchool = function (school) {
        $scope.displayEditSchool = true;
        $scope.displayCreateSchool = false;
        schoolPromoService.getSchoolById(school._id).then(function (res) {
            $scope.schoolToEdit = res.data;
        });
    }
    $scope.btnEditClass = function (promo) {
        $scope.displayEditClass = true;
        $scope.displayCreateClass = false;
        schoolPromoService.getPromoById(promo._id).then(function (res) {
            console.log(res.data);
            console.log(moment(res.data.startDate, "YYYY-MM-DDTHH:mm:ssZ").toDate());
            $scope.classToEdit = {};
            $scope.classToEdit.startDate = moment(res.data.startDate, "YYYY-MM-DDTHH:mm:ssZ").toDate()
            $scope.classToEdit.endDate = moment(res.data.endDate, "YYYY-MM-DDTHH:mm:ssZ").toDate()
            $scope.classToEdit._id = res.data._id;
            $scope.classToEdit.schoolId = res.data.schoolId;
        });
    }

    //LOAD SCHOOL
    function loadSchool() {
        schoolPromoService.getSchool().then(function (res) {
            $scope.listSchools = res.data
        });
    }
    loadSchool();

    //CREATE SCHOOL
    $scope.newSchool = {};
    $scope.createSchool = function () {
        schoolPromoService.createSchool($scope.newSchool).then(function (res) {
            loadSchool()
            $scope.newSchool = {};
            $scope.displayCreateSchool = false;
        });
    };

    //EDIT SCHOOL
    $scope.editSchool = function () {
        schoolPromoService.updateSchool($scope.schoolToEdit._id, $scope.schoolToEdit).then(function (res) {
            loadSchool();
            $scope.schoolToEdit = {};
            $scope.displayEditSchool = false;
        })
    }

    //DELETE SCHOOL 
    $scope.deleteSchool = function (school) {
        var message = "Voulez vraiment supprimer cette école ? Attention toutes les promos et élèves qui sont reliés à l'école serront également supprimés"
        var resultat = window.confirm(message);
        if (resultat) {
            schoolPromoService.deleteSchool(school._id).then(function (res) {
                loadSchool();
            });
        }
    }

    //LOAD CLASS
    function loadPromos(school) {
        schoolPromoService.getPromoBySchoolId(school).then(function (res) {
            $scope.listPromos = res.data
        });
    }

    $scope.SchoolToPromos = function (school) {
        $scope.displayCreateClassBtn = true;
        $scope.whatSchool = school.title;
        loadPromos(school._id);
        //CREATE CLASS
        $scope.newClass = {};
        $scope.newClass.schoolId = school._id
        $scope.createClass = function () {
            $scope.newClass.title = moment($scope.newClass.startDate).format('MMM YYYY') + ' - ' + moment($scope.newClass.endDate).format('MMM YYYY');
            schoolPromoService.createPromo($scope.newClass).then(function (res) {
                loadPromos(school._id)
                $scope.newClass = undefined;
                $scope.displayCreateClass = false;
            });
        }
    };
    // EDIT CLASS
    $scope.editClass = function () {
        $scope.classToEdit.title = moment($scope.classToEdit.startDate).format('MMM YYYY') + ' - ' + moment($scope.classToEdit.endDate).format('MMM YYYY');
        schoolPromoService.updatePromo($scope.classToEdit._id, $scope.classToEdit).then(function (res) {
            loadPromos($scope.classToEdit.schoolId);
            $scope.classToEdit = {};
            $scope.displayEditClass = false;
        });
    };
    //DELETE CLASS
    $scope.deleteClass = function (promo) {
        var message = "Voulez vraiment supprimer cette promo ? Attention toutes les élèves qui sont reliés à la promo serront également supprimés"
        var resultat = window.confirm(message);
        if (resultat) {
            schoolPromoService.deletePromo(promo._id).then(function (res) {
                loadPromos(promo.schoolId);
            });
        }
    }
}