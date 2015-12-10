function skillService($http, $rootScope) {
    return {
        get: function () {
            return $http.get('/skills', {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },
        update: function (id, data) {
            return $http.put('/skills/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        create: function (data) {
            return $http.post('/skills', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        delete: function (id) {
            return $http.delete('/skills/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        }
    }
};