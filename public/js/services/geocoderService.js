function geocoderService($http) {
    return {
        CoordinateByAdress: function (adress) {
            return $http.get('http://api.opencagedata.com/geocode/v1/geojson?q=' + adress + '&key=f19356fae7cde32df2260a13f6380851');
        }
    }
}