angular.module('briandavidvaughn').service('Album', function($http) {
  return {
    loadAlbums: function(bandId) {
      return $http.get('/data/albums/' + bandId + '.json');
    }
  };
});
