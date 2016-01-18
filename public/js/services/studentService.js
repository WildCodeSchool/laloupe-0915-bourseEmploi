function studentService($http, $cookies) {
    return {
        //STUDENT'S ROUTES   /!\ 
        getAll: function () {
            return $http.get('/api/users/students', {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        getUserbyId: function (id) {
            return $http.get('/api/students/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        sendId: function (id) {
            return $http.get('/api/sendId/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        getStudentbyPromo: function (promo) {
            return $http.get('api/students_promo', {
                headers: {
                    'promos': promo,
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },
        getInfo: function () {
            return $http.get('/api/infos/students', {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        getStudentFiltered: function (data) {
            return $http.post('/api/students/filter', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        create: function (data) {
            return $http.post('/api/students', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        update: function (id, data) {
            return $http.put('/api/students/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        like: function (id, data) {
            return $http.put('api/like/students/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        unlike: function (id, data) {
            return $http.put('api/unlike/students/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        delete: function (id) {
            return $http.delete('/api/students/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        //FORMATION ROUTES  /!\ 
        newFormation: function (data) {
            return $http.post('/api/formations', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        updateFormation: function (id, data) {
            return $http.put('/api/formations/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        deleteFormation: function (id) {
            return $http.delete('/api/formations/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        //EXPERIENCE ROUTES  /!\ 
        newExperience: function (data) {
            return $http.post('/api/experiences', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        updateExperience: function (id, data) {
            return $http.put('/api/experiences/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        deleteExperience: function (id) {
            return $http.delete('/api/experiences/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        }
    }
};