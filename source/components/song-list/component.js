angular.module('briandavidvaughn').directive('songList', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/song-list/component.html',
    scope: {
      album: '=?',
      band: '=?',
      songs: '=',
      showTrackNumber: '@?'
    }
  };
});
