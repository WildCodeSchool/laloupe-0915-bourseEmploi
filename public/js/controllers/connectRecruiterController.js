function connectRecruiterController($scope, $location, connectRecruiterService) {

    $scope.logo = {};
    $scope.picture = {};
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