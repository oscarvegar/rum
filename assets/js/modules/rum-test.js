angular.module('rum-test', [])
.directive('rumTest', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/modules/rum-test.html'
    };
  });