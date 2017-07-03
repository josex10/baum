var conexion = require('../models/conexion.js');

var puntosModelo = {};
//GET - Consultar Facturas por Cliente
puntosModelo.consultarPuntosPorFacturaDeCliente = function(cli_id, callback) {

	if (conexion){
		var sql = "SELECT * FROM tbl_puntos WHERE pun_fac_id IN (";
		sql += " SELECT fac_id FROM tbl_facturas WHERE fac_cli_id = " + conexion.escape(cli_id) + " AND fac_fechacompra > date_add(now(), interval -1 year) );";
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				//Sumamos los puntos
				var totalPuntos =0;
				for(var i =0; i < rows.length; i++){
					totalPuntos += parseFloat(rows[i]['pun_totalpun']);
				}
				callback(null, totalPuntos);
			}

		});

	}
};

puntosModelo.insertarPuntos = function(datos, callback) {

	if (conexion){
		var sql = "INSERT INTO tbl_puntos ";
			sql += "(pun_fac_id, pun_totalpun, pun_tipo) ";
			sql += " VALUES (";
			sql += " " + conexion.escape(datos['pun_fac_id']) + ", ";
			sql += " " + conexion.escape(datos['pun_totalpun']) + ", ";
			sql += " " + conexion.escape(datos['pun_tipo']) + "); ";
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}
		});

	}
};


module.exports = puntosModelo;

