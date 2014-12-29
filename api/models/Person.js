/**
* Person.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		consecutivoSeccion: 'string',
		alfaClaveElectoral: 'String',
		fechaNaciClaveElectoral: 'String',
		lugarNacimiento: 'String',
		sexo: 'String',
		digitoVerificador:'String',
		claveHomonima:'String',
		fechaInscripcionPadron:'Date',
		edad:'Integer',
		nombre:'String',
		apellidoPaterno:'String',
		apellidoMaterno:'String',
		fechaNacimientoErronea:'String',
		fechaNacimiento:'Date',
		esFechaCalculada:'String',
		calle:'String',
		numeroInterior:'String',
		numeroExterior:'String',
		colonia:'String',
		codigoPostal:'String',
		tiempoResidencia:'String',
		ocupacion:'String',
		folioNacional:'String',
		numeroCertificadoNaturalizacion:'String',
		fechaNaturalizacion:'Date',
		paisNacimiento:'String',
		enListaNominal:'String',
		descripcionGeoreferencia:'String',
		lugarNacimientoDescripcion:'String',
		entidad:'Integer',
		distrito:'Integer',
		municipio:'Integer',
		seccion:'Integer',
		localidad:'Integer',
		manzana:'Integer',
		consecutivoLongCambio:'String',
		consecutivo:'String',
		numEmisionCredencial:'String',
		gemelo:'Integer'

  }
};

