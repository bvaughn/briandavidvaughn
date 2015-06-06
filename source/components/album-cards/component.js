angular.module('briandavidvaughn').directive('albumCards', function() {
  return {
    restrict: 'E',
    templateUrl: 'source/components/album-cards/component.html',
    scope: {
      albums: '='
    }
  };
});
