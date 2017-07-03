var conexion = require('../models/conexion.js');
var clienteModelo = require('../models/cliente.js');
var facturaModelo = require('../models/factura.js');
var puntosModelo = require('../models/puntos.js');

var puntosController = {};
//GET - Return a register with specified ID
puntosController.consularPuntosPorCliente = function(cli_id, callback) {
	var respuesta = "";

	//1.Validamos que el Cliente Exista
	//2.Consultamos los puntos
	//3.Sumamos los puntos

	//1.Validamos que el Cliente Exista
	clienteModelo.consultarCliente(cli_id, function(error, data){
		if(error){
			throw error;
		}else{
			if(data.length <= 0){
				respuesta = "El cliente no existe";
				callback(null, respuesta);
			}else{

				//2.Consultamos los puntos
				puntosModelo.consultarPuntosPorFacturaDeCliente(cli_id, function(error, data2){
					if(error){
						throw error;
					}else{
						if(data2.length <= 0){
							respuesta = "El cliente no tiene facturas registradas";
							callback(null, respuesta);
						}else{
							callback(null, data2);
						}
					}	
				});//FIN ---- 2.Consultamos los puntos
				
			}
		}	
	});//FIN ---- 1.Validamos que el Cliente Exista

		
};


module.exports = puntosController;
