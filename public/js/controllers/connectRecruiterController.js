function connectRecruiterController($scope, $location, connectRecruiterService) {

    $scope.logo = {};
    $scope.EMAIL_REGEXP = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z.]{2,3}$/;

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    //envoie des données recruteur

    $scope.send = function () {
        var data = {};
        $scope.recruiter = data;

        connectRecruiterService.create(data).then(function (res) {
            if (!res.data) {
                console.log(data);
                $scope.incompleteError = true;
            } else if ($scope.password === $scope.password2 && $scope.password != undefined) {
                $location.path('/homeRecruiter');
            }
        })
    }

    //Upload photo

    $scope.previewFile = function () {
        var preview = document.querySelector('#preview');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
            $scope.logo = reader.result;
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

}