var conexion = require('../models/conexion.js');

var articulosModelo = {};
//GET - Consultar Facturas por Cliente

articulosModelo.insertarArticulos = function(datos, callback) {

	if (conexion){
		var sql = "INSERT INTO tbl_articulos ";
			sql += "(art_fac_id, art_sku, art_cant, art_preciouni) ";
			sql += " VALUES (";
			sql += " " + conexion.escape(datos['art_fac_id']) + ", ";
			sql += " " + conexion.escape(datos['art_sku']) + ", ";
			sql += " " + conexion.escape(datos['art_cant']) + ", ";
			sql += " " + conexion.escape(datos['art_preciouni']) + "); ";
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}
		});

	}
};


module.exports = articulosModelo;