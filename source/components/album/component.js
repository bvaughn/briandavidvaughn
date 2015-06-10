angular.module('briandavidvaughn').directive('album', function() {
  return {
    restrict: 'E',
    templateUrl: 'source/components/album/component.html',
    scope: {
      album: '=',
      band: '='
    }
  };
});
