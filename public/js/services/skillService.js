function skillService($http) {
    return {
        get: function (data) {
            return $http.get('/api/skills', data);
        },
        update: function (id, data, user) {
            return $http.put('/api/skills/' + id, data, {
                headers: {
                    userid: user._id
                }
            });
        },
        create: function (data) {
            return $http.post('/api/skills', data);
        },
        delete: function (id, user) {
            return $http.delete('/api/skills/' + id, {
                headers: {
                    userid: user._id
                }
            });
        }
    }
};