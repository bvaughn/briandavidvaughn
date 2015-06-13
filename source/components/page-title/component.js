angular.module('briandavidvaughn').directive('pageTitle', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/components/page-title/component.html',
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

      $scope.toggleLeftNav = function() {
        $rootScope.leftSidenavIsOpen = !$rootScope.leftSidenavIsOpen;
      };
    }
  };
});
