function studentService($http, $rootScope) {
    return {
        //STUDENT'S ROUTES   /!\ 
        getAll: function (type) {
            return $http.get('/api/users/' + type, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        getUserbyId: function (id) {
            return $http.get('/api/students' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        create: function (data) {
            return $http.post('/api/students', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        update: function (id, data) {
            return $http.put('/api/students/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/students/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        //FORMATION ROUTES  /!\ 
        newFormation: function (data) {
            return $http.post('/api/formations', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        updateFormation: function (id, data) {
            return $http.put('/api/formations/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        deleteFormation: function (id) {
            return $http.delete('/api/formations/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        //EXPERIENCE ROUTES  /!\ 
        newExperience: function (data) {
            return $http.post('/api/experiences', data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        updateExperience: function (id, data) {
            return $http.put('/api/experiences/' + id, data, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        },

        deleteExperience: function (id) {
            return $http.delete('/api/experiences/' + id, {
                headers: {
                    authorization: $rootScope.token
                }
            });
        }
    }
};