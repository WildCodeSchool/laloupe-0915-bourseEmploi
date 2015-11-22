function skillService($http) {
	return {
		get : function(user) {
			return $http.get('/skills', {headers : {userid : user._id} });
		},
		update : function(id, data, user){
			return $http.put('/skills/' + id, data, {headers : {userid : user._id} });
		},
		create : function(data) {
			return $http.post('/skills', data);
		},
		delete : function(id, user) {
			return $http.delete('/skills/' + id, {headers : {userid : user._id} });
		}
	}
};