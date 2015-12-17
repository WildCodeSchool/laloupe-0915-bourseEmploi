function skillService($http, $cookies) {
    return {
        get: function () {
            return $http.get('/skills', {
                headers: {
                 authorization: $cookies.get('wildFinder_token')
             }
            });
        },
        update: function (id, data) {
            return $http.put('/skills/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        create: function (data) {
            return $http.post('/skills', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        delete: function (id) {
            return $http.delete('/skills/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        }
    }
};