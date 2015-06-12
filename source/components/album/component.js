angular.module('briandavidvaughn').directive('album', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/album/component.html',
    scope: {
      album: '=',
      band: '='
    }
  };
});
