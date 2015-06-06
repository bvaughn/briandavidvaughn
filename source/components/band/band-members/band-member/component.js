angular.module('briandavidvaughn').directive('bandMember', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'source/components/band/band-members/band-member/component.html',
    scope: {
      member: '='
    }
  };
});
