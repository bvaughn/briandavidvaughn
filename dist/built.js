var module = angular.module('briandavidvaughn', ['ngMaterial', 'ui.router']);
module.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/albums');

  $stateProvider
    .state('resume', {
      url: '/resume',
      views: {
        header: {
          template: '<page-title title="title"></page-title>',
          controller: function($scope) {
            $scope.title = 'Resume';
          }
        },
        body: {
          template: '<resume></resume>'
        }
      }
    });

  $stateProvider
    .state('band', {
      url: '/band/:bandId',
      resolve: {
        band: function($stateParams, Band) {
          return Band.load($stateParams.bandId);
        }
      },
      views: {
        header: {
          template: '<page-title title="title"></page-title>',
          controller: function($scope, band) {
            $scope.title = band.name;
          }
        },
        body: {
          template: '<band band="band"></band>',
          controller: function($scope, band) {
            $scope.band = band;
          }
        }
      }
    });
});

angular.module('briandavidvaughn').service('Album', function($http) {
  return {
    loadAlbums: function(bandId) {
      return $http.get('/data/albums/' + bandId + '.json');
    }
  };
});

angular.module('briandavidvaughn').service('Band', function($http) {
  return {
    load: function(bandId) {
      return $http.get('/data/bands/' + bandId + '.json').then(function(response) {
        return response.data;
      });
    }
  };
});

angular.module('briandavidvaughn').service('Firebase', function($firebaseArray, $firebaseObject) {
  var baseUrl = 'https://glaring-torch-3191.firebaseio.com/';

  return {
    createArray: function(path) {
      return $firebaseArray(new Firebase(baseUrl + path));
    },
    createObject: function(path) {
      return $firebaseObject(new Firebase(baseUrl + path));
    }
  };
});

angular.module('briandavidvaughn').directive('albumCards', function() {
  return {
    restrict: 'E',
    templateUrl: 'source/components/album-cards/component.html',
    scope: {
      albums: '='
    }
  };
});

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

angular.module('briandavidvaughn').directive('bandMembers', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'source/components/band/band-members/component.html',
    scope: {
      members: '='
    }
  };
});

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
