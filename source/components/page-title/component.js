angular.module('briandavidvaughn').directive('pageTitle', function() {
  return {
    restrict: 'E',
    templateUrl: 'source/components/page-title/component.html',
    replace: true,
    scope: {
      title: '=?',
      titles: '=?'
    },
    link: function($scope) {
      if (!$scope.titles) {
        $scope.titles = [$scope.title];
      }

      document.body.title = $scope.titles.join(' > ');
    }
  };
});
