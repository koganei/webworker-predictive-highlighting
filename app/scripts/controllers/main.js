'use strict';

/**
 * @ngdoc function
 * @name webworkerPredictiveHighlightingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webworkerPredictiveHighlightingApp
 */
angular.module('webworkerPredictiveHighlightingApp')
  .controller('MainCtrl', function ($scope, predictiveHighlighting) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.current = predictiveHighlighting.data;

  });
