var conexion = require('../models/conexion.js');

var facturaModelo = {};
//GET - Consultar Facturas por Cliente
facturaModelo.consultarFacturasPorCliente = function(cli_id, callback) {

	if (conexion){
		var sql = 'SELECT * FROM tbl_facturas WHERE fac_cli_id = ' + conexion.escape(cli_id);
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}

		});

	}
};

facturaModelo.consultarFactura = function(fac_id, callback) {

	if (conexion){
		var sql = 'SELECT * FROM tbl_facturas WHERE fac_id = ' + conexion.escape(fac_id);
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}

		});

	}
};

facturaModelo.insertarFactura = function(datos, callback) {

	if (conexion){
		var sql = "INSERT INTO tbl_facturas ";
			sql += "(fac_id, fac_cli_id, fac_fechacompra, fac_moneda, fac_puntosredim, fac_total) ";
			sql += " VALUES (";
			sql += " " + conexion.escape(datos['fac_id']) + ", ";
			sql += " " + conexion.escape(datos['fac_cli_id']) + ", ";
			sql += " " + conexion.escape(datos['fac_fechacompra']) + ", ";
			sql += " " + conexion.escape(datos['fac_moneda']) + ", ";
			sql += " " + conexion.escape(datos['fac_puntosredim']) + ", ";
			sql += " " + conexion.escape(datos['fac_total']) + " );";
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}
		});

	}
};




module.exports = facturaModelo;