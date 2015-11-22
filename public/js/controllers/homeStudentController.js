function homeStudentController($scope){
    
    function initialize() {
      var mapProp = {
        center:new google.maps.LatLng(46.8429639,2.1696329),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);


}