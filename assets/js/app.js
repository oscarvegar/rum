angular.module('rumApp', ['snap','rum-militancia','rum-reportes'])
.controller('rumController',["$scope","$http",function($scope,$http) {
    $scope.opts = {
  		disable: 'right'
	};
    $scope.personQuery ={};
    $scope.persons =[];
    $scope.currPersons=[];
    $scope.showMilitancia = true;
    $scope.showReportes = false;
	$scope.showMenu = true;
    $scope.selectMenu = function(vari){
    	console.log(vari);
    	$scope.showMilitancia = false;
    	$scope.showReportes = false;

    	$scope[vari] = true;
    	return;
    }

	$scope.buscar = function(){
		if($scope.personQuery.alfaClaveElectoral==null || 
			$scope.personQuery.alfaClaveElectoral.length < 6)
				//$scope.currPersons = $scope.persons;
				return;
		if($scope.personQuery.alfaClaveElectoral.length == 6){
			//$scope.showTable= false;
			$scope.showCreate= false;
			//$scope.showLoader= true;
				$http.get('/person/slim?alfaClaveElectoral='+$scope.personQuery.alfaClaveElectoral.toUpperCase())
					.then(function (res) {
						$scope.persons = res.data;
						$scope.currPersons = $scope.persons;
						$scope.showLoader= false;
						$scope.showMilitantes= true;
						for(var i=0;i<$scope.persons.length;i++){
							$scope.currPersons[i].claveCompleta = $scope.currPersons[i].alfaClaveElectoral
								+ $scope.currPersons[i].fechaNaciClaveElectoral
								+ $scope.currPersons[i].lugarNacimiento
								+ $scope.currPersons[i].sexo
								+ $scope.currPersons[i].digitoVerificador
								+ $scope.currPersons[i].claveHomonima;
						}
					});
		}else if($scope.personQuery.alfaClaveElectoral.length > 6 ){
				$scope.currPersons= [];
				for(var i=0;i<$scope.persons.length;i++){
					if($scope.persons[i].claveCompleta.indexOf
						($scope.personQuery.alfaClaveElectoral.toUpperCase().substring(0,$scope.personQuery.alfaClaveElectoral.length))>-1){
							$scope.currPersons.push($scope.persons[i]);
						}
				}
		}
		
		
	};
	
    
	
	
}]);

                 
                