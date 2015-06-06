angular.module('briandavidvaughn').service('Band', function($http) {
  return {
    load: function(bandId) {
      return $http.get('/data/bands/' + bandId + '.json').then(function(response) {
        return response.data;
      });
    }
  };
});
