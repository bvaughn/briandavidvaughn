angular.module('briandavidvaughn').service('Album', function($http) {
  return {
    load: function(bandId, albumId) {
      return $http.get('/data/albums/' + bandId + '/' + albumId + '.json').then(function(response) {
        return response.data;
      });
    }
  };
});
