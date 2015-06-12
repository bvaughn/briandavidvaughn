angular.module('briandavidvaughn').directive('bandMember', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/components/band/band-members/band-member/component.html',
    scope: {
      member: '='
    }
  };
});
