angular.module('iplApp.controllers', [])
.controller('teamCtrl', function($scope,$firebaseObject,$state,$rootScope,ImageService,$stateParams,$ImageCacheFactory) {
  // console.log('after click',$stateParams.teaminformation);
  console.log('teamCtrl');
  $scope.teamname = $stateParams.teaminformation;
    /*passing the reference to firebase to get data*/
    var ref = firebase.database().ref('tean_info');
    var syncObject = $firebaseObject(ref);
    /*loading data as a promise*/
    syncObject.$loaded().then(function(data) {
      /*Adding the data to the scope object*/
        $scope.images = {};
        $scope.imageCache = [];
        // console.log(data);
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
        console.log($scope.images);
        $scope.data = data;
        $scope.teamdata = {};
        angular.forEach(data,function(i){
            if(i.team_name == $scope.teamname){
            console.log(i.team_name);
            console.log(i);
            $scope.teamdata = i;
          }
        })
        console.log($scope.teamdata);
        // $scope.url;
        // $scope.$apply($scope.getImage);
        // $scope.images = {};
        $scope.getImage = function(image) {
           console.log(image);
           var url = ImageService.getUrl(image).then(function(url) {
              //  console.log($scope[image]);
              //  $scope.images[image] = url;
              //  console.log($scope.images);
              //  console.log($scope.iurl);
                // console.log(url);
                // var tag = angular.element(document.getElementById(image));
                // tag.src = url;
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

.controller('playerCtrl', function($scope,  $firebaseObject, $rootScope,$stateParams,ImageService){
    console.log("playerCtrl");
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
}
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
)

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  console.log("chatControl");
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  console.log("AccountControl");
  $scope.settings = {
    enableFriends: true
  };
});
