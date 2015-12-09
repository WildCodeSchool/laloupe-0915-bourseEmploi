function studentService($http) {
    return {
        getAll: function () {
            return $http.get('/offers');
        },

        getUserbyId: function (id) {
            return $http.get('/offers/' + id);
        },

        update: function (id, data, user) {
            return $http.put('/offers/' + id, data, {
                headers: {
                    userid: user._id
                }
            });
        }
    }
};