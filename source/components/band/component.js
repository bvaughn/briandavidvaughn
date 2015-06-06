angular.module('briandavidvaughn').directive('band', function($sce, Band) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'source/components/band/component.html',
    scope: {
      band: '=?',
      bandId: '@?'
    },
    link: function($scope) {
      if ($scope.bandId) {
        Band.load($scope.bandId).success(
          function(band) {
            $scope.band = band;
            $scope.band.description = $sce.trustAsHtml($scope.band.description);
          });
      } else if ($scope.band) {
        $scope.band.description = $sce.trustAsHtml($scope.band.description);
      }
    }
  };
});
