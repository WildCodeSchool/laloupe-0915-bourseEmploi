function offerService($http) {
	return {
		get : function(offer) {
			return $http.get('/offers', offer);
		},
		create : function(data, user) {
			return $http.post('/offers', data, {headers : {userid : user._id} });
		},
	}
};