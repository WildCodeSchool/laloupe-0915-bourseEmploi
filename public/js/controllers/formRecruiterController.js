function formRecruiterController($scope, $location, formRecruiterService) {

    $scope.EMAIL_REGEXP = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z.]{2,3}$/;


    //Init preview
    var preview = document.querySelector('#preview');
    var preview2 = document.querySelector('#preview2');
    preview.style.display = 'none';
    preview2.style.display = 'none';

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    //envoie des données recruteur
    $scope.send = function () {
        var data = {};
        data = $scope.recruiter;
        data.logo = $scope.logo;
        data.picture = $scope.picture;

        formRecruiterService.create(data).then(function (res) {
            if (!res.data) {
                console.log(res.data);
                $scope.incompleteError = true;
            } else
                $location.path('/homeRecruiter');
        })
    }

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

    //Affichage.

    $scope.step1 = true;
    $scope.step12 = true;
    $scope.step2 = false;
    $scope.step3 = false;
    $scope.step23 = false;

    $scope.Step2 = function () {
        formRecruiterService.checkMail($scope.recruiter.email).then(function (res) {
            // SUCCESS
            if ($scope.recruiter.password != $scope.password2) {
                $scope.errPassword = true;
                $scope.displayError = false;
                $scope.password2 = undefined;
                $scope.recruiter.password = undefined;
            } else {
                $scope.errPassword = false;
                $scope.step1 = false;
                $scope.step12 = true;
                $scope.step23 = true;
                $scope.step2 = true;
                $scope.step3 = false;
            }
        }).catch(function (err) {
            //ERROR
            $scope.errPassword = false;
            $scope.err = err.data;
            $scope.displayError = true;
        });

    }

    $scope.Step1 = function () {
        $scope.step1 = true;
        $scope.step12 = true;
        $scope.step23 = false;
        $scope.step2 = false;
        $scope.step3 = false;
    }

    $scope.Step3 = function () {
        $scope.step1 = false;
        $scope.step12 = false;
        $scope.step23 = true;
        $scope.step2 = false;
        $scope.step3 = true;
    }
}