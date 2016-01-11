//EDIT RECRUTEUR CONTROLLER
function editRecruiterController($scope, $rootScope, $routeParams, $anchorScroll, recruiterService) {
    //JS pour les popups d'aides
    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    //ancre pour le menu
    $anchorScroll.yOffset = 20;
    $scope.scrollTo = function (id) {
        $scope.activesubmenu = "#" + id;
        $anchorScroll(id);
    }

    function loadRecruiter() {
        recruiterService.getRecruiterById($rootScope.user._id).then(function (res) {
            console.log(res.data);
            $scope.name = res.data.name;
            $scope.email = res.data.email;
            $scope.phone = res.data.phone;
            $scope.country = res.data.country;
            $scope.region = res.data.region;
            $scope.city = res.data.city;
            $scope.zipCode = res.data.zipCode;
            $scope.address = res.data.address;
            $scope.businessSector = res.data.businessSector;
            $scope.size = res.data.size;
            $scope.description = res.data.description;
            $scope.responsability = res.data.responsability;
            $scope.wildSide = res.data.wildSide;
            $scope.twitter = res.data.twitter;
            $scope.linkedin = res.data.linkedin;
            $scope.instagram = res.data.instagram;
            $scope.website = res.data.website;
            $scope.facebook = res.data.facebook;
            $scope.logo = res.data.logo;
            $scope.picture = res.data.picture;
        });
    }
    loadRecruiter();

    //Init preview
    var preview = document.querySelector('#preview');
    var preview2 = document.querySelector('#preview2');
    preview.style.display = 'block';
    preview2.style.display = 'block';

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

    //Mise a jour infos personnelles
    $scope.update1 = function () {
        var data = {};
        data.name = $scope.name;
        data.email = $scope.email;
        data.phone = $scope.phone;
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour des coordonées
    $scope.update2 = function () {
        var data = {};
        data.country = $scope.country;
        data.region = $scope.region;
        data.city = $scope.city;
        data.zipCode = $scope.zipCode;
        data.address = $scope.address;
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour des visibilités
    $scope.update3 = function () {
        var data = {};
        data.size = $scope.size;
        data.businessSector = $scope.businessSector;
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Suppression du logo
    $scope.deleteLogo = function () {
        var data = {};
        data.logo = "";
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            alert('ok');
        });
    }
    loadRecruiter();

    //Suppression de la photo
    $scope.deletePicture = function () {
        var data = {};
        data.picture = "";
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            alert('ok');
        });
    }
    loadRecruiter();

    //Mise a jour des descriptions
    $scope.update4 = function () {
        var data = {};
        data.description = $scope.description;
        data.wildSide = $scope.wildSide;
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour des photos
    $scope.update5 = function () {
        var data = {};
        data.logo = $scope.logo;
        data.picture = $scope.picture;
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

    //Mise a jour des liens sociaux
    $scope.update6 = function () {
        var data = {};
        data.website = $scope.website;
        data.facebook = $scope.facebook;
        data.twitter = $scope.twitter;
        data.linkedin = $scope.linkedin;
        data.instagram = $scope.instagram;
        recruiterService.update($rootScope.user._id, data).then(function (res) {
            if (!res.data) {
                alert('pas ok');
            } else {
                alert('ok');
            }
        })
    }

}