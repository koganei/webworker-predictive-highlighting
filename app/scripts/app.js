'use strict';

/**
 * @ngdoc overview
 * @name webworkerPredictiveHighlightingApp
 * @description
 * # webworkerPredictiveHighlightingApp
 *
 * Main module of the application.
 */
angular
  .module('webworkerPredictiveHighlightingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    
  })

  .run(function($rootScope, predictiveHighlighting) {
    $rootScope.predict = predictiveHighlighting;
  })

  .factory('predictiveHighlighting', function($timeout) {

    var currentMousePosition;
    var positionHistory = [];
    
    var data = {
      vector: { x: 0, y: 0, speed: 0 }
    };

    data.start = function() {
      currentMousePosition = { x: 0, y: 0 };
      //angular.element('body').on('mousemove.predictiveHighlighting', onMouseMove);
    };

    data.stop = function() {
      //angular.element('body').unbind('mousemove.predictiveHighlighting');
    };

    data.onMouseMove = function(event) {
      currentMousePosition = { x: event.clientX, y: event.clientY };
      console.log('upd vector');
      $timeout(function() {
        updateCurrentVector();
      });
    };

    function updateCurrentVector() {
      positionHistory.unshift(currentMousePosition);
      positionHistory = positionHistory.slice(0, 5);
      angular.extend(data.vector, calculateCurrentVector());
      console.log(data.vector);
    }

    function calculateCurrentVector() {
      var total = { x: 0, y: 0, speed: 0 };
      angular.forEach(positionHistory, function(current, i) {
        var previous = positionHistory[i - 1] ? positionHistory[i - 1] : null;

        if(previous) {
          total.x     += current.x     - previous.x;
          total.y     += current.y     - previous.y;
          // total.speed += current.speed - previous.speed;
        }
      });
      return total;
    }

    data.start();
    

    return {
      data: data
    };
  });
