function skillService($http, $cookies) {
    return {
        get: function () {
            return $http.get('/api/skills', {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },
        getbyId: function (id) {
            return $http.get('/api/one/skills', {
                headers: {
                    '_id': id,
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },
        checkSkill: function (title) {
            return $http.get('/api/checkskill', {
                headers: {
                    'title': title,
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },
        update: function (id, data) {
            return $http.put('/api/skills/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        create: function (data) {
            return $http.post('/api/skills', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/skills/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        }
    }
};