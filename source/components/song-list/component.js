angular.module('briandavidvaughn').directive('songList', function() {
  return {
    restrict: 'E',
    templateUrl: 'source/components/song-list/component.html',
    scope: {
      album: '=?',
      band: '=?',
      songs: '='
    }
  };
});
