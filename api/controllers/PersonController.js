/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs'),
    readline = require('readline'),
	moment = require('moment'),
	http = require('http'), 
	Levenshtein = require('levenshtein');
	/*var mongoClient = require('mongodb').MongoClient,format = require('util').format;
	var db;
	mongoClient.connect('mongodb://localhost:27017/inedata',function(err,ldb){
	
		if(err) throw err;
		db = ldb;
	});*/
		
	
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
		//var mongoClient = require('mongodb').MongoClient,format = require('util').format;
		
        console.log(p1);
       // console.log(p2);
			Person.find({"alfaClaveElectoral":p1},
			//db.collection('person').find({"alfaClaveElectoral":p1,"fechaNaciClaveElectoral":(p2+"")},
			{id:1,nombre:1,apellidoPaterno:1,apellidoMaterno:1,fechaNaciClaveElectoral:1,registrado:1,lugarNacimiento:1,sexo:1,digitoVerificador:1,claveHomonima:1,alfaClaveElectoral:1,fechaNaciClaveElectoral:1}).exec(function(err,pers){
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
		//var mongoClient = require('mongodb').MongoClient,format = require('util').format;

		var respuesta = 'ID\tFechaCaptura\tTipo\tCategoria\tFechaLevantamiento\tFolio\tClaveElector\tSeccion\tNumCredencial\tFechaNacimiento\tGenero\tNombre\tPaterno\tMaterno\tCalle\tNum_Ext\tNum_Int\tCP\tEstado\tMunicipio\tColonia\tTelefono\tCorreo\tFechaAfiliacion\tOrganizacion\tCargo\tUniclave\tOperador\tHoraCaptura\tSTATUS';
		//var respuesta = 'APELLIDO PATERNO\tAPELLINO MATERNO\tNOMBRE\tCLAVE_ELECTORAL\tOCR\tCALLE\tNUMERO_EXTERIOR\tCOLONIA\tCODIGO_POSTAL\tDELEGACION\tOCUPACION\tFOLIO_NACIONAL\tENTIDAD\tDISTRITO\tMUNICIPIO\tSECCION\tLOCALIDAD\tMANZANA\tCONSECUTIVO\tES_GEMELO\tTELEFONO_CASA\tCELULAR\tEMAIL\tFACEBOOK\tTWITTER\tESTADO_CIVIL\tTELEFONO_OFICINA\tNEXTEL\tSECTOR_ORGANIZACION\tCARGO_ACTUAL\tTIPO_ASAMBLEA\tCOMISION_POLITICA_PERMANENTE\tTIPO_DIRIGENCIA\tTIPO_JUSTICIA_PARTIDARIA\tTIPO_DEFENSORIA\tASAMBLEAS;DIRIGENCIAS';
		Person.find({"registrado":1}).exec(function(err,pers){
			res.setHeader("Content-Encoding", "UTF-8");
			res.setHeader("Content-Type", "text/csv; charset=UTF-8");
			res.setHeader("Content-Disposition", "attachment; filename=Militantes.csv");
			for(var i=0;i<pers.length;i++){
				var curr = pers[i];
				var cve = curr.claveCompleta;
				var ocr = curr.seccion.toString()+curr.consecutivo.toString();
				respuesta += "\n"
				+curr.id+"\t"
				+moment().format('DD-MM-YYYY')+"\t"
				+'AFILIACION'+"\t"
				+curr.tipoRegistro+"\t"
				+moment().format('DD-MM-YYYY')+"\t"
				+'DEL AREA'+"\t"
				+cve+"\t"
				+curr.seccion+"\t"
				+ocr+"\t"
				+moment(curr.fechaNacimiento).format('DD-MM-YYYY')+"\t"
				+curr.sexo+"\t"
				+curr.nombre+"\t"
				+curr.apellidoPaterno+"\t"
				+curr.apellidoMaterno+"\t"
				+curr.calle+"\t"
				+curr.numeroExterior+"\t"
				+curr.numeroInterior+"\t"
				+curr.codigoPostal+"\t"
				+'DISTRITO FEDERAL'+"\t"
				+curr.descripcionGeoreferencia+"\t"
				+curr.colonia+"\t"
                +curr.celular+"\t"
                +curr.email+"\t"
                +moment().format('DD-MM-YYYY')+"\t"
                +curr.sectorOrganizacion!=null?curr.sectorOrganizacion:"N/A"+"\t"
                +curr.cargoActual!=null?curr.cargoActual:"N/A"+"\t"
                +"N/A"+"\t"
                +"a.melgoza"+"\t"
                +moment().format('hh:mm:ss')+"\t"
                +'ACTIVO';
				/*+curr.apellidoPaterno+"\t"
				+curr.apellidoMaterno+"\t"
				+curr.nombre+"\t"+cve+"\t\'"+ocr+"\t"
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
                +curr.tipoDefensoria; */
                //for(var as in curr.asambleas
                
				
			};
            respuesta = quitacomas(respuesta);
            console.log(respuesta);
			res.end(respuesta);
		});
	},

	'localizar':function(req,res){
		Person.findOne({id:req.allParams().id}).exec(function(err,per){
			if(per.seccion==null){
				return res.json(404,{msg:"PERSONA SIN SECCION"});
			}
			var gisUrl="http://atomicware.mx:8080/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50&outputformat=application%2Fjson";
			var querySecciones=gisUrl+"&typeName=opengeo%3ASecciones_wgs84z14&cql_filter=SECCION="+per.seccion;
			
	        HttpClientService.get(querySecciones,function(data){ 
	        	data = JSON.parse(data);
	        	
	        	var coordsSec = UtilService.arrayToCoords(data.features[0].geometry.coordinates[0][0]);
	        	
	    		//options.path= gisUrl+"&typeName=opengeo:Vialidades_wgs84z14&cql_filter=DWITHIN(the_geom,MULTIPOLYGON((("+coordsSec+"))),1,meters)";
	        	//console.log(options.path);
	        	HttpClientService.get("http://atomicware.mx:8080/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&maxFeatures=50&outputformat=application%2Fjson&typeName=opengeo:Vialidades_wgs84z14\
	        		&cql_filter=DWITHIN(the_geom,MULTIPOLYGON((("+coordsSec+"))),1,meters)",function(data){
	        		data = JSON.parse(data);
	        		var lowestLev = 10000;
	        		var posiblesCalles = null;
        			for(var i in data.features){
        				var nombre = data.features[i].properties.NOMBRE;
        				console.log(per.calle+">>>"+nombre )
        				if(per.calle == null || nombre == null)
        					return res.json(404,{msg:"PERSONA SIN CALLE"})
        				var currdistance = new Levenshtein(nombre,per.calle).distance;
        				if(currdistance < lowestLev){
        					lowestLev = currdistance;
        					posiblesCalles = [];
        					posiblesCalles.push(data.features[i])
        				}else if(currdistance == lowestLev){
        					posiblesCalles.push(data.features[i])
        				}
        			}
        			//console.log(JSON.stringify(posiblesCalles));
        			//for(var i in posiblesCalles){
        				
        				console.log(posiblesCalles);
        				var coords = UtilService.arrayToCoords(posiblesCalles[0].geometry.coordinates[0]);
        				var queryLotes = "http://atomicware.mx:8080/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ACat_31_Cuau0&maxFeatures=50&outputformat=application%2Fjson\
        				&cql_filter=DWITHIN(the_geom,MULTILINESTRING(("+coords+")),25,meters)&";
        				HttpClientService.get(queryLotes,function(data){
        					data = JSON.parse(data);
        					lowestLev = 10000;
        					var found = false;
        					for(var i in data.features){
        						var currentLote = data.features[i];
        						console.log(currentLote.properties.NOEXT+" >>>>>>> "+per.numeroExterior)
        						console.log(currentLote.properties.NOEXT==per.numeroExterior)
        						//console.log(new Levenshtein(currentLote.properties.NOEXT,per.numeroExterior).distance)
        						if(currentLote.properties.NOEXT == per.numeroExterior){
        							res.json(currentLote);
        							found = true;
        						}
        					}
        					if(found==false)
        						res.json(data.features[0]);
        				});
        			//}
	        		
	        	});
	        	
	        });
		});
		

	}
	
};

