// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('iplApp', ['ionic', 'iplApp.controllers', 'iplApp.services','firebase','ionic.ion.imageCacheFactory'])
.run(function($ionicPlatform,$rootScope) {
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

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/team.html',
        controller: 'teamCtrl'
      }
    }
  })
  .state('teamplayer',{
              url: '/?teamname',
              templateUrl : 'templates/player.html',
              controller : 'playerCtrl'
            })
  // .state('tab.home.playerinfo', {
  //     url: '/?teamname',
  //     views:{
  //       'tab-home':{
  //         templateUrl: 'templates/player.html',
  //         controller: 'playerCtrl'
  //       }
  //     }
  // })
  .state('tab.teaminfo', {
    url: '/teaminfo',
    views: {
      'tab-teaminfo': {
        templateUrl: 'templates/teaminfo.html',
        controller: 'teamCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
}).directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                // alert('image is loaded');
                console.log('image is loaded');
            });
        }
    };
});
