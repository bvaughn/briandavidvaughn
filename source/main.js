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
