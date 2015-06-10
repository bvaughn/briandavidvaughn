angular.module('briandavidvaughn').service('Album', function($http) {
  return {
    load: function(albumId) {
      return $http.get('/data/albums/' + albumId + '.json').then(function(response) {
        return response.data;
      });
    }
  };
});
