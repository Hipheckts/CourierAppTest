//TODO: move to different files
angular.module('starter.controllers', [])

.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, FirebaseProvider, uiGmapGoogleMapApi, $cordovaGeolocation, $ionicPlatform, $cordovaDevice) {
    
    $scope.data = [];
    $scope.usersList = [];
    $scope.map = { center: { latitude: 40, longitude: -99 }, zoom: 6 };
    var isActive = false;
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    var lat  = null;
    var long = null;
    var watchOptions = {timeout : 3000, enableHighAccuracy: false};
    var watch = $cordovaGeolocation.watchPosition(watchOptions);

    uiGmapGoogleMapApi.then(function(maps) {});

    $ionicPlatform.ready(function() {
        
        FirebaseProvider.init($cordovaDevice.getUUID()); //$cordovaDevice.getUUID()

        FirebaseProvider.signIn().then(function(firebaseUser) {
            $scope.usersList = FirebaseProvider.getAllData();
        })
    });

    function updateUserData() {
        FirebaseProvider.addUserData(
            {
                name: $scope.data.name,
                coords: {
                    latitude: lat,
                    longitude: long
                },
                color: getRandomColor()
            }
        );
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function startWatchPosition() {
        watch.then(
            null,
                
            function(err) {
                console.log(err)
            },
                
            function(position) {
                lat  = position.coords.latitude
                long = position.coords.longitude
                console.log(lat + '' + long);

                updateUserData();
            }
        );
    }

    function toggleOn() {
        FirebaseProvider.signIn().then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            // bind firebase and local scope variable
            $scope.usersList = FirebaseProvider.getAllData();
            updateUserData();
        }).catch(function(error) {
            console.log(error);
        });
    }

    function toggleOff() {
        FirebaseProvider.removeUserData().then(function(ref) {
            //FirebaseProvider.signOut();
        }, function(error) {
            console.log("Error:", error);
        });
    }

    $scope.updateUserName = function() {
        if ( isActive ) updateUserData();
    }

    $scope.toggleUser = function() {
        if ( $scope.data.toggle === 'ON' ) {
            toggleOn();
            isActive = true;
            startWatchPosition()
        } else {
            toggleOff();
            isActive = false;
            watch.clearWatch();
        }
    };

    $scope.getPinUrl = function(color) {
        var pinUrl = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|';
        return pinUrl + color;
    }

    // watch changes on firebase 
    $scope.$watch('usersList', function () {
        console.log('usersList changed:', $scope.usersList);
    }, true);

   $cordovaGeolocation
    .getCurrentPosition(posOptions)
        
    .then(function (position) {
        lat  = position.coords.latitude
        long = position.coords.longitude
        console.log(lat + '   ' + long)
    }, function(err) {
        console.log(err)
   });
   
}

MainCtrl.$inject = ['$scope', 'FirebaseProvider', 'uiGmapGoogleMapApi', '$cordovaGeolocation', '$ionicPlatform', '$cordovaDevice'];
