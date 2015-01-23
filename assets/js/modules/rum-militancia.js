angular.module('rum-militancia', [])

.controller('militanciaController',["$scope","$http",function($scope,$http) {
    $scope.showTable= false;
    $scope.showLoader= false;
    $scope.showCreate= false;
    $scope.persons= [];
    //$scope.currPersons= [];
    $scope.personQuery ={};
    $scope.selectedPerson = null;
    $scope.showformRegistro = false;
    $scope.tipoRegistro = 0;
	


	
	
    $scope.mostrarRegistro = function(person){
        $scope.selectedPerson = person;
        $scope.selectedPerson.asambleas = [{}];
        $scope.selectedPerson.dirigencias = [{}];
        $scope.hideAll();
        $scope.showformRegistro = true;
        
    };
    
	$scope.registrar = function(){
		$scope.selectedPerson.registrado = 1;
        if($scope.tipoRegistro==1)$scope.selectedPerson.tipoRegistro = "MILITANTE";
        if($scope.tipoRegistro==2)$scope.selectedPerson.tipoRegistro = "CUADRO";
        if($scope.tipoRegistro==3)$scope.selectedPerson.tipoRegistro = "DIRIGENTE";
		$http.post('/person/'+$scope.selectedPerson.id,$scope.selectedPerson)
			.then(function (res) {
				alert("Se Ha Registrado con Éxito");
				$scope.personQuery.alfaClaveElectoral = null;
				$scope.persons = null;
				$scope.$parent.buscar();
			  });
	};
	
	$scope.loadCreate = function(){
		$scope.showTable = false;
		$scope.showLoader = false;
		$scope.showCreate = true;
		
	};
	
	$scope.hideAll = function(){
		$scope.showTable = false;
		$scope.showLoader = false;
		$scope.showCreate = false;
        $scope.showFormRegistro = false;
		
	};
	
	$scope.create = function(){
		
		
		$scope.newPerson.claveElector = $scope.newPerson.claveElector.toUpperCase();
		$scope.newPerson.nombre = $scope.newPerson.nombre.toUpperCase();
		$scope.newPerson.apellidoPaterno = $scope.newPerson.apellidoPaterno.toUpperCase();
		$scope.newPerson.apellidoMaterno = $scope.newPerson.apellidoMaterno.toUpperCase();
		$scope.newPerson.colonia = $scope.newPerson.colonia.toUpperCase();
		$scope.newPerson.descripcionGeoreferencia = $scope.newPerson.descripcionGeoreferencia.toUpperCase();
		$scope.newPerson.alfaClaveElectoral = $scope.newPerson.claveElector.substring(0,6);
		$scope.newPerson.fechaNaciClaveElectoral = $scope.newPerson.claveElector.substring(6,12);
		$scope.newPerson.lugarNacimiento = $scope.newPerson.claveElector.substring(12,14);
		$scope.newPerson.sexo = $scope.newPerson.claveElector.substring(14,15);
		$scope.newPerson.digitoVerificador = $scope.newPerson.claveElector.substring(15,16);
		$scope.newPerson.claveHomonima = $scope.newPerson.claveElector.substring(16,17);
		$scope.newPerson.consecutivo = $scope.newPerson.consecutivo.substring(3,$scope.newPerson.consecutivo.length);
		console.log(">>>>> ANTES DE POST");
		$http.post('/person',$scope.newPerson).success(function(data) {
			alert("Persona creada exitosamente");
			$scope.personQuery.alfaClaveElectoral = $scope.newPerson.alfaClaveElectoral;
			$scope.newPerson = null;
			$scope.$parent.buscar();
		});
		
	};

	$scope.localizarPersona = function(person){
		console.log(person);	
		$http.post('/person/localizar/'+person["id"]).success(function(data) {
			console.log(data)
			console.log(data.properties.CVEPREDIAL)
			document.getElementById('map').innerHTML="";
			var map = new ol.Map({
	        target: 'map',
	        layers: [
	          new ol.layer.Tile({
	            source: new ol.source.MapQuest({layer: 'osm'})
	          }),
	           new ol.layer.Tile({
	            title: "Global Imagery",
	            source: new ol.source.TileWMS({
	              url: 'http://atomicware.mx:8080/geoserver/opengeo/wms',
	              params: {'LAYERS':'opengeo:Cat_31_Cuau0','CQL_FILTER':"CVEPREDIAL = '"+data.properties.CVEPREDIAL+"'"}
	            })
	          })
	        ],
	        view: new ol.View({
	          center: ol.proj.transform([-99.1324754,19.4326804], 'EPSG:4326', 'EPSG:3857'),
	          zoom: 13
	        })
	      });

		});


		
	}
	
	
}]).directive('rumMilitancia', function() {

    return {
        restrict: 'E',
        templateUrl: 'js/modules/rum-militancia.html',
        scope : {
        	currPersons : "=persons"
    	}
    };
  });;