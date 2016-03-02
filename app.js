angular.module('app', ['angular.filter'])

.controller('AppCtrl', function($scope, $http) {
  $http.get('https://s3.amazonaws.com/public.earshotinc.com/locations.json')
    .success(function(data) {
      $scope.locations = data;
    })
    .error(function(error) {
      $scope.alert = error.reason;
    });

  // locations
  $scope.checkCount = 0;
  $scope.$watch('locations', function(locations) {
    var checkCount = 0;

    angular.forEach(locations, function(location) {
      if (location.checked)
        checkCount += 1;
    });

    $scope.checkCount = checkCount;
  }, true);

  $scope.checkedLocations = [];
  $scope.checkList = function() {
    var checkedLocations = $scope.locations.filter(function(location) {
      return location.checked;
    });

    $scope.checkedLocations = checkedLocations;
  };

  $scope.checkAll = function(status) {
    angular.forEach($scope.locations, function(location) {
      location.checked = status;
    });
  };

  $scope.addChecked = function() {
    $scope.checkList();
    angular.forEach($scope.checkedLocations, function(location) {
      console.log(location);
    });
  };

  var showInfo = function() {};

  $scope.checkState = function() {
    angular.forEach(this.name, function(location) {
      location.checked = true;
    });
  };

  // map
  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8816376, lng: -87.6261326},
    zoom: 12
  });

  $scope.markers = [];
  $scope.bounds = new google.maps.LatLngBounds();

  $scope.setBounds = function() {
    angular.forEach($scope.markers, function(marker) {
      bounds.extend(marker.getPosition());
    });
  };

  $scope.makeMarker = function(location) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.latitude, location.longitude),
      map: $scope.map
    });

    $scope.markers.push(marker);
  };

  $scope.mapLocations = function() {
    $scope.clearMap();
    $scope.checkList();
    // $scope.setBounds();
    // $scope.map.fitBounds($scope.bounds);
    angular.forEach($scope.checkedLocations, function(location) {
      $scope.makeMarker(location);
    });
  };

  $scope.clearMap = function() {
    angular.forEach($scope.markers, function(marker) {
      marker.setMap(null);
    });
  };
});
