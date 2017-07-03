var conexion = require('../models/conexion.js');

var clienteModelo = {};
//GET - Return a register with specified ID
clienteModelo.consultarCliente = function(cli_id, callback) {

	if (conexion){
		var sql = 'SELECT * FROM tbl_clientes WHERE cli_id = ' + conexion.escape(cli_id);
		
		conexion.query(sql , function(error, rows) {
			if(error){
				throw error;
			}else{
				callback(null, rows);
			}

		});

	}

	
};


module.exports = clienteModelo;