angular.module('rum-reportes', [])
.controller('reportController',["$scope","$http",function($scope,$http) {
	$scope.selectedDel = null;
	$scope.buscarSecciones = function(){
		console.log($scope.selectedDel);
	}
}]).directive('rumReportes', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/modules/rum-reportes.html'
        
    };
  });