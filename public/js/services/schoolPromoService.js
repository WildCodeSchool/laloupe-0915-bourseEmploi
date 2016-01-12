function schoolPromoService($http, $cookies) {
    return {
        /* ----------------------   PROMO SERVICE   ----------------------------- */
        getPromo: function () {
            return $http.get('/api/promo', {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },
        updatePromo: function (id, data) {
            return $http.put('/api/promo/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        createPromo: function (data) {
            return $http.post('/api/promo', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        deletePromo: function (id) {
            return $http.delete('/api/promo/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        /* ----------------------   SCHOOL SERVICE   ----------------------------- */

        getSchool: function () {
            return $http.get('/api/school', {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },
        updateSchool: function (id, data) {
            return $http.put('/api/school/' + id, data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        createSchool: function (data) {
            return $http.post('/api/school', data, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        },

        deleteSchool: function (id) {
            return $http.delete('/api/school/' + id, {
                headers: {
                    authorization: $cookies.get('wildFinder_token')
                }
            });
        }
    }
};