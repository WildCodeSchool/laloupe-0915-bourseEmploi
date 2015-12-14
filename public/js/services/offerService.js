function offerService($http, $rootScope) {
    return {
        getAll: function () {
            return $http.get('/api/offers', {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        getOfferbyId: function (id) {
            return $http.get('/api/ffers/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        getOfferByUser: function (id) {
            return $http.get('/api/offers/users/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        create: function (data) {
            return $http.post('/api/offers', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        update: function (id, data, user) {
            return $http.put('/api/offers/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/offers/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        }
    }
};