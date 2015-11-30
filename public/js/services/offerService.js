function offerService($http) {
    return {
        getAll: function () {
            return $http.get('/offers');
        },

        getOfferbyId: function (id) {
            return $http.get('/offers/' + id);
        },

        update: function (id, data, user) {
            return $http.put('/offers/' + id, data, {
                headers: {
                    userid: user._id
                }
            });
        },

        create: function (data) {
            return $http.post('/offers', data);
        },

        delete: function (id, user) {
            return $http.delete('/offers/' + id, {
                headers: {
                    userid: user._id
                }
            });
        }
    }
};