function offerService($http, $rootScope) {
    return {
        getAll: function () {
            return $http.get('/offers', {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        getOfferbyId: function (id) {
            return $http.get('/offers/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        getOfferByUser: function (id) {
            return $http.get('/offers/users/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        create: function (data) {
            return $http.post('/offers', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        update: function (id, data, user) {
            return $http.put('/offers/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        delete: function (id) {
            return $http.delete('/offers/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        getOfferBySkill: function (data) {
            return $http.post('api/offers/skills', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        }
    }
};