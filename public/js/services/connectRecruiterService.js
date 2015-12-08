function connectRecruiterService($http) {
    return {
        getRecruiterbyId: function (id) {
            return $http.get('/recruiters/id/' + id);
        },
        update: function (id, data, user) {
            return $http.put('/recruiters/' + id, data, {
                headers: {
                    userid: user._id
                }
            });
        },
        create: function (data) {
            return $http.post('/recruiters', data);
        },
        delete: function (id, user) {
            return $http.delete('/recruiters/' + id, {
                headers: {
                    userid: user._id
                }
            });
        }
    }
};