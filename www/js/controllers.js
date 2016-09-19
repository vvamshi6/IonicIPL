/*
* FileName:tabs.html
* CreatedBy: Vamsee
* Date :12-08-2016
* Purpose : Creating IPL app using ionic framework
*/
/*Injecting the controllers to the module*/
angular.module('iplApp.controllers', [])
.controller('teamCtrl', function($scope,$firebaseObject,$state,$rootScope,ImageService,$stateParams,$ImageCacheFactory) {
  // console.log('after click',$stateParams.teaminformation);
  $scope.teamname = $stateParams.teaminformation;
    /*passing the reference to firebase to get data*/
    var ref = firebase.database().ref('tean_info');
    var syncObject = $firebaseObject(ref);
    /*loading data as a promise*/
    syncObject.$loaded().then(function(data) {
      // alert('in sync Object function');
      /*Adding the data to the scope object*/
        $scope.data = data;
        $scope.imageCache = [];
        // console.log(data);
        $scope.images = [];
        angular.forEach(data,function(i){
          var storage = firebase.storage();
          var storageRef = firebase.storage().ref();
          /*Returning promise which contains the url*/
          storageRef.child(i.team_img_url).getDownloadURL().then(function(url) {
              $scope.imageCache.push(url);
              $scope[i.team_img_url] = url;
              $scope.images[i.team_img_url] = url;
              console.log(url);
          }).catch(function(error) {
              console.log("Error" + error);
          });
          // $scope.images[i.team_img_url] = url;
        })
        console.log($scope.imageCache);
        $ImageCacheFactory.Cache($scope.imageCache);
        $scope.teamdata = {};
        angular.forEach(data,function(i){
            if(i.team_name == $scope.teamname){
            console.log(i.team_name);
            console.log(i);
            $scope.teamdata = i;
          }
        })
        console.log($scope.teamdata);
        console.log($scope.images);
        $scope.getImage = function(image) {
          //  console.log(image);
           var url = ImageService.getUrl(image).then(function(url) {
                // console.log(url);
                // var tag = angular.element(document.getElementById(image));
                // tag.src = url;
                // $scope.images[image] = url;
               document.getElementById(image).src = url;
               // return url;
               // var myEl = angular.element( document.querySelector( '#image' ) );
               // myEl.ngSrc = url;
               // var target = angular.element(image);
               // target.src = url;
           });
       }
    });
})
/*Player Ctrl*/
.controller('playerCtrl', function($scope,  $firebaseObject, $rootScope,$stateParams,ImageService,$ionicHistory){
    console.log("playerCtrl");
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
    $scope.teamname = $stateParams.teamname.replace(/\s/g, "");
    var ref = firebase.database().ref($scope.teamname);
    var syncObject = $firebaseObject(ref);
    syncObject.$loaded().then(function(result) {
        $scope.data = result;
        });
    $scope.getImage = function(image) {
        console.log('function called in ');
        var url = ImageService.getUrl(image).then(function(url) {
            document.getElementById(image).src = url;
        });
    }
});
