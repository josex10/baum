var conexion = require('../models/conexion.js');
var clienteModelo = require('../models/cliente.js');
var facturaModelo = require('../models/factura.js');
var puntosModelo = require('../models/puntos.js');
var articulosModelo = require('../models/articulos.js');

var facturaController = {};
//GET - Return a register with specified ID
facturaController.insertarFactura = function(datos, callback) {
	var respuesta = "";

	//Calculamos el total
	var totalFactura = 0;
	
	if(datos['fac_articulos'].length > 0){
		for(var i = 0; i < datos['fac_articulos'].length ; i++){
			var totalPorArticulo = parseFloat(datos['fac_articulos'][i]['art_cant']) *  parseFloat(datos['fac_articulos'][i]['art_preciouni']);
			totalFactura += totalPorArticulo;
		}
	}
	
	datos['fac_total'] = totalFactura;

	//Validamos los datos
		if(datos['fac_id'].trim() === ""){
			respuesta = "El numero de factura esta en blanco.";
			callback(null, respuesta);
		}else if(datos['fac_id'].trim().length > 11){
			respuesta = "El numero de la factura es muy largo";
			callback(null, respuesta);
		}if(datos['fac_cli_id'].trim() === ""){
			respuesta = "El cliente de la factura esta en blanco.";
			callback(null, respuesta);
		}else if(datos['fac_cli_id'].trim().length > 20 ){
			respuesta = "El cliente de la factura es muy largo";
			callback(null, respuesta);
		}if(datos['fac_fechacompra'].trim() === ""){
			respuesta = "La fecha de la factura esta en blanco.";
			callback(null, respuesta);
		}else if(datos['fac_fechacompra'].trim().length > 10 ){
			respuesta = "La fecha de la factura es muy largo";
			callback(null, respuesta);
		}if(datos['fac_moneda'].trim() === ""){
			respuesta = "El tipo de moneda de la factura esta en blanco.";
			callback(null, respuesta);
		}else if(datos['fac_moneda'].trim().length > 20 ){
			respuesta = "El tipo de moneda de la factura es muy largo";
			callback(null, respuesta);
		}else if(datos['fac_puntosredim'].trim() === ""){
			respuesta = "Los puntos redimidos de la factura estan en blanco.";
			callback(null, respuesta);
		}else if(isNaN(datos['fac_puntosredim'].trim())){
			respuesta = "Los puntos redimidos de la factura no son datos numericos";
			callback(null, respuesta);
		}else{
			//1.Validamos que el Cliente Exista
			//2.Validamos el numero de factura no exista
			//3.Agregamos la factura
			//4.Agregamos los puntos

			//1.Validamos que el Cliente Exista
			clienteModelo.consultarCliente(datos['fac_cli_id'], function(error, data){
				if(error){
					throw error;
				}else{
					if(data.length <= 0){
						respuesta = "El cliente no existe";
						callback(null, respuesta);
					}else{

						//2.Validamos el numero de factura no exista
						facturaModelo.consultarFactura(datos['fac_id'], function(error, data2){
							if(error){
								throw error;
							}else{
								if(data2.length > 0){
									respuesta = "El numero de factura ya existe";
									callback(null, respuesta);
								}else{

									puntosModelo.consultarPuntosPorFacturaDeCliente(datos['fac_cli_id'], function(error, data4){
										if(error){
											throw error;
										}else{
											var difPuntos = parseFloat(data4)  + parseFloat(datos['fac_puntosredim']);
											if(difPuntos >= 0){

												
												//3.Agregamos la factura
												facturaModelo.insertarFactura(datos, function(error, data3){
													if(error){
														throw error;
													}else{
														if(data3.length > 0){
															respuesta = "El numero de factura ya existe";
															callback(null, respuesta);
														}else{

															//Insertamos los productos
															for(var i = 0; i < datos['fac_articulos'].length ; i++){
																var datosArticulos = {
																	art_fac_id : datos['fac_id'],
																	art_sku : datos['fac_articulos'][i]['art_sku'],
																	art_cant : datos['fac_articulos'][i]['art_cant'],
																	art_preciouni : datos['fac_articulos'][i]['art_preciouni']
																}

																
																articulosModelo.insertarArticulos(datosArticulos, function(error, data4){
																	if(error){
																		throw error;
																	}
																});
															}
															//4.Agregamos los puntos


															if(datos['fac_puntosredim'] < 0){
																var datosPuntos = {
																	pun_fac_id : datos['fac_id'],
																	pun_totalpun : datos['fac_puntosredim'],
																	pun_tipo : 'Resta'
																};

																puntosModelo.insertarPuntos(datosPuntos, function(error, data4){
																	if(error){
																		throw error;
																	}else{
																		
																		if(datos['fac_total'] > datos['fac_puntosredim']){
																			var puntosafavor = 0;
																			puntosafavor =  (parseFloat(datos['fac_total']) + parseFloat(datos['fac_puntosredim'])) * 0.10;
																			var datosPuntos = {
																				pun_fac_id : datos['fac_id'],
																				pun_totalpun : puntosafavor,
																				pun_tipo : 'Suma'
																			};

																			puntosModelo.insertarPuntos(datosPuntos, function(error, data4){
																				if(error){
																					throw error;
																				}else{
																					callback(null, "Todo Correcto");
																				}	
																			});//FIN ---- 3.Agregamos los puntos 
																		}
																	}	
																});//FIN ---- 3.Agregamos los puntos 

															}else{
																var puntosafavor = 0;
																puntosafavor = (datos['fac_total'] - datos['fac_puntosredim']) * 0.10;
																console.log(puntosafavor);
																var datosPuntos = {
																	pun_fac_id : datos['fac_id'],
																	pun_totalpun : puntosafavor,
																	pun_tipo : 'Suma'
																};

																puntosModelo.insertarPuntos(datosPuntos, function(error, data4){
																	if(error){
																		throw error;
																	}else{
																		callback(null, "Todo Correcto");
																	}	
																});//FIN ---- 3.Agregamos los puntos 
															}
														}
													}	
												});//FIN ---- 3.Agregamos la factura
											}else{
												respuesta = "El cliente no tiene puntos suficientes";
												callback(null, respuesta);
											}
										}
									});


									
								}
							}	
						});//FIN ---- 2.Validamos el numero de factura no exista
						
					}
				}	
			});//FIN ---- 1.Validamos que el Cliente Exista
		}		
};


module.exports = facturaController;