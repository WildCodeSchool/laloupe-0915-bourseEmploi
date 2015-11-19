function connectRecruiterController($scope, connectRecruiterService){
    
    $scope.send = function(){
		var data = {};
        data.companyName = $scope.companyName;
        data.companySize = $scope.companySize;
        data.businessSector = $scope.businessSector;
        data.companyDescription = $scope.companyDescription;
        data.functionReferent = $scope.functionReferent;
        data.country = $scope.country;
        data.region = $scope.region;
        data.city = $scope.city;
        data.adress = $scope.adress;
        data.website = $scope.website;
        data.facebook = $scope.facebook;
        data.twitter = $scope.twitter;
        data.instagram = $scope.instagram;
        data.linkedin = $scope.linkedin;
        data.email = $scope.email;
        data.phoneNumber = $scope.phoneNumber;
        
        connectRecruiterService.create(data).then(function(res){
            
        });

    }


}

function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-33.8688, 151.2195),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'),
          mapOptions);

        var input = document.getElementById('city_form_affinage');
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // Inform the user that the place was not found and return.
            input.className = 'notfound';
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          var image = new google.maps.MarkerImage(
              place.icon,
              new google.maps.Size(71, 71),
              new google.maps.Point(0, 0),
              new google.maps.Point(17, 34),
              new google.maps.Size(35, 35));
          marker.setIcon(image);
          marker.setPosition(place.geometry.location);
        });
      }
      google.maps.event.addDomListener(window, 'load', initialize)