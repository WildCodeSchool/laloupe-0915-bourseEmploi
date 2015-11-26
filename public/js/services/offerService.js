function offerService($http) {
    return {
        get: function (data) {
            return $http.get('/offers', data);
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