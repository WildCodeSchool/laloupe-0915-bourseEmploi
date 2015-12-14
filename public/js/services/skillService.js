function skillService($http, $rootScope) {
    return {
        get: function () {
            return $http.get('/api/skills', {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },
        update: function (id, data) {
            return $http.put('/api/skills/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        create: function (data) {
            return $http.post('/api/skills', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/skills/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        }
    }
};