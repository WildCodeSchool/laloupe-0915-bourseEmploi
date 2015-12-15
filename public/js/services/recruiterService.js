function recruiterService($http, $cookies) {
    return {
        getRecruiterbyId: function (id) {
            return $http.get('/api/recruiters/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
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
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/recruiters/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        }
    }
};