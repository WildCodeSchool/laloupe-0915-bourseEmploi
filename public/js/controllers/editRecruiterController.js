//EDIT RECRUTEUR CONTROLLER
function editRecruiterController($scope, $rootScope, $routeParams, $anchorScroll, $location, recruiterService) {
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
        recruiterService.getRecruiterById($routeParams.id).then(function (res) {
            $scope.recruiter = res.data;
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
            $scope.recruiter.logo = reader.result;
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
            $scope.recruiter.picture = reader2.result;
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
        data.name = $scope.recruiter.name;
        data.email = $scope.recruiter.email;
        data.phone = $scope.recruiter.phone;
        recruiterService.update($routeParams.id, data).then(function (res) {
            console.log(data);
            if (!res.data) {
                alert('erreur lors de la mise a jour');
            } else {
                alert('mise a jour éffectuée');
            }
        })
    }

    //Mise a jour des coordonées
    $scope.update2 = function () {
        var data = {};
        data.country = $scope.recruiter.country;
        data.region = $scope.recruiter.region;
        data.city = $scope.recruiter.city;
        data.zipCode = $scope.recruiter.zipCode;
        data.address = $scope.recruiter.address;
        recruiterService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('erreur lors de la mise a jour');
            } else {
                alert('mise a jour éffectuée');
            }
        })
    }

    //Mise a jour des visibilités
    $scope.update3 = function () {
        var data = {};
        data.size = $scope.recruiter.size;
        data.businessSector = $scope.recruiter.businessSector;
        recruiterService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('erreur lors de la mise a jour');
            } else {
                alert('mise a jour éffectuée');
            }
        })
    }

    //Suppression du logo
    $scope.deleteLogo = function () {
        var data = {};
        data.logo = "";
        recruiterService.update($routeParams.id, data).then(function (res) {
            alert('image éffacée');
        });
        loadRecruiter();
    }

    //Suppression de la photo
    $scope.deletePicture = function () {
        var data = {};
        data.picture = "";
        recruiterService.update($routeParams.id, data).then(function (res) {
            alert('image éffacée');
        });
        loadRecruiter();
    }

    //Mise a jour des descriptions
    $scope.update4 = function () {
        var data = {};
        data.description = $scope.recruiter.description;
        data.wildSide = $scope.recruiter.wildSide;
        recruiterService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('erreur lors de la mise a jour');
            } else {
                alert('mise a jour éffectuée');
            }
        })
    }

    //Mise a jour des photos
    $scope.update5 = function () {
        var data = {};
        data.logo = $scope.recruiter.logo;
        data.picture = $scope.recruiter.picture;
        recruiterService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('erreur lors de la mise a jour');
            } else {
                alert('mise a jour éffectuée');
            }
        })
    }

    //Mise a jour des liens sociaux
    $scope.update6 = function () {
        var data = {};
        data.website = $scope.recruiter.website;
        data.facebook = $scope.recruiter.facebook;
        data.twitter = $scope.recruiter.twitter;
        data.linkedin = $scope.recruiter.linkedin;
        data.instagram = $scope.recruiter.instagram;
        recruiterService.update($routeParams.id, data).then(function (res) {
            if (!res.data) {
                alert('erreur lors de la mise a jour');
            } else {
                alert('mise a jour éffectuée');
            }
        })
    }

    //DELETE STUDENT
    $scope.deleteRecruiter = function () {
        var message = "Voulez vraiment supprimer ce compte ?"
        var resultat = window.confirm(message);
        if (resultat) {
            recruiterService.delete($routeParams.id).then(function (res) {
                $location.path('/login')
            });
        }
    }

}