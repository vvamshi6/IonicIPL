/*
* FileName:tabs.html
* CreatedBy: Vamsee
* Date :12-08-2016
* Purpose : Creating IPL app using ionic framework
*/
/*ImageService to retrieve image from firebase*/
angular.module('iplApp.services', [])
.factory('ImageService', function() {
    var url = {};
  return {
       /*Creating getUrl function*/
         getUrl: function(image) {
           /*Creating firebase storage and firebase reference*/
             var storage = firebase.storage();
             var storageRef = firebase.storage().ref();
             /*Returning promise which contains the url*/
             return storageRef.child(image).getDownloadURL().then(function(url) {
                 return url;
             }).catch(function(error) {
                 console.log("Error" + error);
             });
         }
     }
 });
