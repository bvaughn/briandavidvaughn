angular.module('briandavidvaughn').directive('bandMembers', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/components/band/band-members/component.html',
    scope: {
      members: '='
    }
  };
});
