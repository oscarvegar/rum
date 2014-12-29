/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs'),
    readline = require('readline'),
	moment = require('moment');
	var mongoClient = require('mongodb').MongoClient,format = require('util').format;
	var db;
	mongoClient.connect('mongodb://localhost:27017/inedata',function(err,ldb){
	
		if(err) throw err;
		db = ldb;
	});
		
	
module.exports = {

/*	'import': function(req, res) {
		var rd = readline.createInterface({
		input: fs.createReadStream('LNREV2013_09_00_39_Campos_01_20130322.txt'),
		output: process.stdout,
		terminal: false
	});
	var count = 0;
	var arrPer = [];
	rd.on('line', function(line) {
		count++;
		var arr = line.split('|');
			var person = person = {
				consecutivoSeccion: arr[0],
				alfaClaveElectoral: arr[1],
				fechaNaciClaveElectoral: arr[2].length==0?null:arr[2],
				lugarNacimiento: arr[3],
				sexo: arr[4],
				digitoVerificador:arr[5],
				claveHomonima:arr[6],
				fechaInscripcionPadron:arr[7].length==0?null:moment(arr[7],'YYYYMMDD'),
				edad:arr[8],
				nombre:arr[9],
				apellidoPaterno:arr[10],
				apellidoMaterno:arr[11],
				fechaNacimientoErronea:arr[12],
				fechaNacimiento:arr[13].length==0?null:moment(arr[13],'YYYYMMDD'),
				esFechaCalculada:arr[14],
				calle:arr[15],
				numeroInterior:arr[16],
				numeroExterior:arr[17],
				colonia:arr[18],
				codigoPostal:arr[19],
				tiempoResidencia:arr[20],
				ocupacion:arr[21],
				folioNacional:arr[22],
				numeroCertificadoNaturalizacion:arr[23],
				fechaNaturalizacion:arr[24].length==0?null:moment(arr[24],'YYYYMMDD'),
				paisNacimiento:arr[25],
				enListaNominal:arr[26],
				descripcionGeoreferencia:arr[27],
				lugarNacimientoDescripcion:arr[28],
				entidad:arr[29],
				distrito:arr[30],
				municipio:arr[31],
				seccion:arr[32],
				localidad:arr[33],
				manzana:arr[34],
				consecutivoLongCambio:arr[35],
				consecutivo:arr[36],
				numEmisionCredencial:arr[37].length==0?null:arr[37],
				gemelo:arr[38].length==0?null:arr[38]
		};
		arrPer.push(person);
		if(person.alfaClaveElectoral == 'VGRDOS')
			console.log(person);
		if(count%10000 == 0)
			console.log(count);
		if(count%5000 == 0){
		
			console.log("ENTRANDO A MIL: "+count);
			Person.create(arrPer).exec(function(err,per){
				if(err!=null){
					console.log(err);
				}else{
					console.log("INSERTA 5000");
						
				}
			
			});
			
			arrPer = [];
			count = 0;
		}
			
		
	});
	
	
	


	},*/
	
	'slim': function(req, res) {
		var cve = (req.param('alfaClaveElectoral'));
	   var p1 = cve.substr(0,6);
	   //var p2 = cve.substr(6,12);
		var mongoClient = require('mongodb').MongoClient,format = require('util').format;
		
        console.log(p1);
       // console.log(p2);
			db.collection('person').find({"alfaClaveElectoral":p1},
			//db.collection('person').find({"alfaClaveElectoral":p1,"fechaNaciClaveElectoral":(p2+"")},
			{id:1,nombre:1,apellidoPaterno:1,apellidoMaterno:1,fechaNaciClaveElectoral:1,registrado:1,lugarNacimiento:1,sexo:1,digitoVerificador:1,claveHomonima:1,alfaClaveElectoral:1,fechaNaciClaveElectoral:1}).toArray(function(err,pers){
				console.log(pers);
				res.json(pers)
			});
		
	},
	
	'export': function(req,res) {
        var quitacomas = function(str){
            str = str.replace(/,/g, '');
            return str;
        };
		var cve = (req.param('alfaClaveElectoral'));
		var mongoClient = require('mongodb').MongoClient,format = require('util').format;
		var respuesta = 'APELLIDO PATERNO\tAPELLINO MATERNO\tNOMBRE\tCLAVE_ELECTORAL\tOCR\tCALLE\tNUMERO_EXTERIOR\tCOLONIA\tCODIGO_POSTAL\tDELEGACION\tOCUPACION\tFOLIO_NACIONAL\tENTIDAD\tDISTRITO\tMUNICIPIO\tSECCION\tLOCALIDAD\tMANZANA\tCONSECUTIVO\tES_GEMELO\tTELEFONO_CASA\tCELULAR\tEMAIL\tFACEBOOK\tTWITTER\tESTADO_CIVIL\tTELEFONO_OFICINA\tNEXTEL\tSECTOR_ORGANIZACION\tCARGO_ACTUAL\tTIPO_ASAMBLEA\tCOMISION_POLITICA_PERMANENTE\tTIPO_DIRIGENCIA\tTIPO_JUSTICIA_PARTIDARIA\tTIPO_DEFENSORIA\tASAMBLEAS;DIRIGENCIAS';
		db.collection('person').find({"registrado":1}).toArray(function(err,pers){
			res.setHeader("Content-Encoding", "UTF-8");
			res.setHeader("Content-Type", "text/csv; charset=UTF-8");
			res.setHeader("Content-Disposition", "attachment; filename=Militantes.csv");
			for(var i=0;i<pers.length;i++){
				var curr = pers[i];
				var cve = curr.claveCompleta;
				var ocr = curr.seccion.toString()+curr.consecutivo.toString();
				respuesta += "\n"+curr.apellidoPaterno+"\t"+curr.apellidoMaterno+"\t"+curr.nombre+"\t"+cve+"\t\'"+ocr+"\t"
                +curr.calle+"\t"
                +curr.numeroExterior+"\t"
                +curr.colonia+"\t"
                +curr.codigoPostal+"\t"
                +curr.descripcionGeoreferencia+"\t"
                +curr.ocupacion+"\t"
                +curr.folioNacional+"\t"
                +curr.entidad+"\t"
                +curr.distrito+"\t"
                +curr.municipio+"\t"
                +curr.seccion+"\t"
                +curr.localidad+"\t"
                +curr.manzana+"\t"
                +curr.consecutivo+"\t"
                +curr.gemelo+"\t"
                +curr.telefonoCasa+"\t"
                +curr.celular+"\t"
                +curr.email+"\t"
                +curr.facebook+"\t"
                +curr.twitter+"\t"
                +curr.estadoCivil+"\t"
                +curr.telefonoOficina+"\t"
                +curr.nextel+"\t"
                +curr.sectorOrganizacion+"\t"
                +curr.cargoActual+"\t"
                +curr.tipoAsamblea+"\t"
                +curr.compolper+"\t"
                +curr.tipoDirigencia+"\t"
                +curr.tipoJusticiaPartidaria+"\t"
                +curr.tipoDefensoria; 
                //for(var as in curr.asambleas
                
				
			};
            respuesta = quitacomas(respuesta);
            console.log(respuesta);
			res.end(respuesta);
		});
	}
	
};

