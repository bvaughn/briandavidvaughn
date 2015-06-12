angular.module('briandavidvaughn').directive('albumCards', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/album-cards/component.html',
    scope: {
      band: '='
    }
  };
});
