angular.module('briandavidvaughn').service('Firebase', function($firebaseArray, $firebaseObject) {
  var baseUrl = 'https://glaring-torch-3191.firebaseio.com/';

  return {
    createArray: function(path) {
      return $firebaseArray(new Firebase(baseUrl + path));
    },
    createObject: function(path) {
      return $firebaseObject(new Firebase(baseUrl + path));
    }
  };
});
