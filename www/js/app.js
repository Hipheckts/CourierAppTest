angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'ngMaterial', 'firebase', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
  var config = {
      apiKey: "AIzaSyCX-QbMSZ7Nq2UYw-HW3C_xWEW-fBMUxIM",
      authDomain: "testtaskcourier-aef33.firebaseapp.com",
      databaseURL: "https://testtaskcourier-aef33.firebaseio.com",
      storageBucket: "testtaskcourier-aef33.appspot.com",
      messagingSenderId: "438253404562"
  };
  firebase.initializeApp(config);

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCX-QbMSZ7Nq2UYw-HW3C_xWEW-fBMUxIM',
    v: '3.25', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
});