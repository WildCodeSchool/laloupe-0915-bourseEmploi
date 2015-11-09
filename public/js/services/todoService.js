function todoService($http) {
	return {
		get : function(user) {
			return $http.get('/todos', {headers : {userid : user._id} });
		},
		update : function(id, data, user){
			return $http.put('/todos/' + id, data, {headers : {userid : user._id} });
		},
		create : function(data, user) {
			return $http.post('/todos', data, {headers : {userid : user._id} });
		},
		delete : function(id, user) {
			return $http.delete('/todos/' + id, {headers : {userid : user._id} });
		}
	}
};