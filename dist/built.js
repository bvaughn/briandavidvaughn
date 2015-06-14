var module = angular.module('briandavidvaughn', ['ngMaterial', 'ui.router']);
module.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        header: {
          template: '<page-title title="title"></page-title>',
          controller: function($scope) {
            $scope.title = 'Hi! My name is Brian.';
          }
        },
        body: {
          template: '<home></home>'
        }
      }
    });

  $stateProvider
    .state('album', {
      url: '/album/:bandId/:albumId',
      resolve: {
        album: function($stateParams, Album) {
          return Album.load($stateParams.bandId, $stateParams.albumId);
        },
        band: function($stateParams, Band) {
          return Band.load($stateParams.bandId);
        }
      },
      views: {
        header: {
          template: '<page-title titles="titles"></page-title>',
          controller: function($scope, band, album) {
            $scope.titles = [band.name, album.name];
          }
        },
        body: {
          template: '<album album="album" band="band"></album>',
          controller: function($scope, album, band) {
            $scope.album = album;
            $scope.band = band;
          }
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

  $stateProvider
    .state('resume', {
      url: '/resume',
      views: {
        header: {
          template: '<page-title titles="titles"></page-title>',
          controller: function($scope) {
            $scope.titles = ['Brian Vaughn', 'Resume'];
          }
        },
        body: {
          template: '<resume></resume>'
        }
      }
    });
});

angular.module('briandavidvaughn').service('Album', function($http) {
  return {
    load: function(bandId, albumId) {
      return $http.get('/data/albums/' + bandId + '/' + albumId + '.json').then(function(response) {
        return response.data;
      });
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

angular.module('briandavidvaughn').directive('album', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/album/component.html',
    scope: {
      album: '=',
      band: '='
    }
  };
});

angular.module('briandavidvaughn').directive('albumCards', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/album-cards/component.html',
    scope: {
      band: '='
    }
  };
});

angular.module('briandavidvaughn').directive('band', function($sce, Band) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/components/band/component.html',
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

angular.module('briandavidvaughn').directive('home', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/home/component.html'
  };
});

angular.module('briandavidvaughn').directive('pageTitle', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/components/page-title/component.html',
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

angular.module('briandavidvaughn').directive('resume', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/resume/component.html',
    link: function($scope) {
    }
  };
});

angular.module('briandavidvaughn').directive('songList', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/song-list/component.html',
    scope: {
      album: '=?',
      band: '=?',
      songs: '=',
      showTrackNumber: '@?'
    }
  };
});

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
