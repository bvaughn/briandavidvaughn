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
