function formRecruiterService($http) {
    return {
        getRecruiterbyId: function (id) {
            return $http.get('/api/recruiters/' + id);
        },
        create: function (data) {
            return $http.post('/api/recruiters', data);
        },
        checkMail: function (email) {
            return $http.get('/api/recruiters/email', {
                headers: {
                    'email': email
                }
            });
        },
    }
};