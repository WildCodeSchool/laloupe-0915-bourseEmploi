function recruiterService($http, $rootScope) {
    return {
        getRecruiterbyId: function (id) {
            return $http.get('/api/recruiters/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
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

        update: function (id, data) {
            return $http.put('/api/recruiters/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/recruiters/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        }
    }
};