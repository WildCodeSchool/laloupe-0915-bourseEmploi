function skillsController($scope, skillService) {

    $scope.displayEdit = false;

    function loadSkill() {
        skillService.get().then(function (res) {
            var skills = res.data;
            skills.forEach(function (skill) {
                if (skill.language == true) {
                    skill.language = 'Language déterminant';
                } else {
                    skill.language = 'Compétence';
                }
            });
            $scope.skills = skills;
            console.log($scope.listSkill);
        });
    }
    loadSkill();

    $scope.newSkill = {};
    $scope.createSkill = function () {
        if ($scope.language == 'true') {
            $scope.newSkill.language = true;
        } else {
            $scope.newSkill.language = false;
        }
        skillService.checkSkill($scope.newSkill.title).then(function (res) {
            // SUCCESS
            skillService.create($scope.newSkill).then(function (res) {
                loadSkill();
                $scope.newSkill = {};
            });
        }).catch(function (err) {
            //ERROR
            $scope.err = err.data;
            $scope.displayError = true;
        });
    };

    $scope.showSkill = function (skill) {
        $scope.skillToEdit = skill;
        $scope.displayEdit = true;
        console.log($scope.skillToEdit._id)

        skillService.getbyId($scope.skillToEdit._id).then(function (res) {
            $scope.skillEdit = res.data
            console.log(res.data)
            if (res.data.language == true) {
                $scope.skillEdit.language = 'Language déterminant';
            } else {
                $scope.skillEdit.language = 'Compétence';
            }
            console.log($scope.skillEdit)
        });
    };

    $scope.editSkill = function () {
        if ($scope.skillEdit.language == 'Language déterminant') {
            $scope.skillEdit.language = true;
        } else {
            $scope.skillEdit.language = false;
        }
        skillService.update($scope.skillEdit._id, $scope.skillEdit).then(function (res) {
            loadSkill();
            $scope.displayEdit = false;
        });
    }

    $scope.deleteSkill = function (skill) {
        console.log(skill);
        var message = 'Voulez vraiment supprimer cette compétence ?'
        var resultat = window.confirm(message);
        if (resultat) {
            skillService.delete(skill._id).then(function (res) {
                loadSkill();
            });
        }
    }
}