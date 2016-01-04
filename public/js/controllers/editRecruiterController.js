//EDIT RECRUTEUR CONTROLLER
function editRecruiterController($scope, $rootScope, $routeParams, $anchorScroll, recruiterService) {
    //JS pour les popups d'aides
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    function loadRecruiter() {
        recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
            console.log(res.data);
            $scope.name = res.data.name;
            $scope.email = res.data.email;
            $scope.epone = res.data.phone;
            $scope.country = res.data.country;
            $scope.city = res.data.city;
            $scope.zipCode = res.data.zipCode;
            $scope.address = res.data.address;
            $scope.bussinessSector = res.data.bussinessSector;
            $scope.size = res.data.size;
            $scope.description = res.data.description;
            $scope.responsability = res.data.responsability;
            $scope.wildSide = res.data.wildSide;
        });
    }
    loadRecruiter();

    // ancre pour le menu
    $anchorScroll.yOffset = 20;
    $scope.scrollTo = function (id) {
        $scope.activesubmenu = "#" + id;
        $anchorScroll(id);
    }

    //Init preview
    var preview = document.querySelector('#preview');
    var preview2 = document.querySelector('#preview2');
    preview.style.display = 'none';
    preview2.style.display = 'none';

    //Upload photo
    $scope.previewFile = function (a) {
        var file = document.querySelector('#logo').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.style.display = 'block';
            preview.src = reader.result;
            $scope.logo = reader.result;
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    $scope.previewFile2 = function () {
        var file2 = document.querySelector('#picture').files[0];
        var reader2 = new FileReader();
        reader2.onloadend = function () {
            preview2.style.display = 'block';
            preview2.src = reader2.result;
            $scope.picture = reader2.result;
        }
        if (file2) {
            reader2.readAsDataURL(file2);

        } else {
            preview2.src = "";
        }
    }
}