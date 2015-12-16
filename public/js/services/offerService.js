function offerService($http, $cookies) {
    return {
        getAll: function () {
            return $http.get('/offers', {
                headers: {
                    authorization: $cookies.get('wildfinder_token')
                }
            });
        },

        getOfferbyId: function (id) {
            return $http.get('/offers/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        getOfferByUser: function (id) {
            return $http.get('/offers/users/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        create: function (data) {
            return $http.post('/offers', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        update: function (id, data) {
            return $http.put('/offers/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        delete: function (id) {
            return $http.delete('/offers/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
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