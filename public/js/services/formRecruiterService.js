function formRecruiterService($http) {
    return {
        getRecruiterbyId: function (id) {
            return $http.get('/recruiters/id/' + id);
        },
        create: function (data) {
            return $http.post('/recruiters', data);
        },
        checkMail: function (email) {
            return $http.get('/recruiters/email', {
                headers: {
                    'email': email
                }
            });
        },
    }
};