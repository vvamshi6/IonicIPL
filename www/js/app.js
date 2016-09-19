/*
* FileName:app.js
* CreatedBy: Vamsee
* Date :12-08-2016
* Purpose : Creating IPL app using ionic framework
*/
/*Creating module with Ionic platform*/
angular.module('iplApp', ['ionic', 'iplApp.controllers', 'iplApp.services','firebase','ionic.ion.imageCacheFactory'])
.run(function($ionicPlatform,$rootScope,$window) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.cordova && window.cordova.logger) {
           window.cordova.logger.__onDeviceReady();
       }
    if (window.StatusBar) {
          StatusBar.styleDefault();
    }
  });
})
/*Routing and different states*/
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
      .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: './templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: './templates/teams.html',
        controller: 'teamCtrl'
      }
    }
  })
  .state('teamplayer',{
              url: '/?teamname',
              templateUrl : './templates/player.html',
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
        templateUrl: './templates/teaminfo.html',
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
                console.log('image directive');
            });
        }
    };
});
