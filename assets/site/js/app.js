function personController($scope,$http) {
    $scope.showTable= false;
    $scope.showLoader= false;
    $scope.showCreate= false;
    $scope.persons= [];
    $scope.currPersons= [];
    $scope.personQuery ={};
    $scope.selectedPerson = null;
    $scope.showformRegistro = false;
    $scope.tipoRegistro = 0;
	
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
						$scope.showTable= true;
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
		$http.post('/person/'+$scope.selectedPerson._id,$scope.selectedPerson)
			.then(function (res) {
				alert("Se Ha Registrado con Éxito");
				$scope.personQuery.alfaClaveElectoral = null;
				$scope.persons = null;
				$scope.buscar();
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
		$http.post('/person',$scope.newPerson).success(function(data) {
			alert("Persona creada exitosamente");
			$scope.personQuery.alfaClaveElectoral = $scope.newPerson.alfaClaveElectoral;
			$scope.newPerson = null;
			$scope.buscar();
		});
		
	};
	
	
}