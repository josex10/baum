//obtenemos el modelo UserModel con toda la funcionalidad
var puntosController = require('../controllers/puntosController.js');
var facturaController = require('../controllers/facturaController.js');
 
//creamos el ruteo de la aplicación
module.exports = function(app)
{
	//Pagina Inicial de nuestro API REST
	app.get("/", function(req, res){
		res.send("Bienvenido al API REST de JOFurniture - Este API conecta nuestro sistema WEB Plan Lealtal con nuestro ERP!");
	});

	//Consultar puntos del cliente
	app.get("/consultar/puntos/cliente/:cli_id", function(req, res){
		
		var cli_id = req.params.cli_id;

		puntosController.consularPuntosPorCliente(cli_id, function(error, respuesta){
			console.log("Esta es la respuesta: " + respuesta);
			res.status(200).json({'accion' : 'Consulta de puntos', 'Respuesta' : respuesta});

		});
	});

	//Agregar una factura y puntos

	/*
		JSON PARA INGRESAR FACTURAS

		DATO IMPORTANTE:
			EN EL CAMPO "fac_puntosredim" : "-10000",  si no se van a redimir ningun numero se ingresa 0 de lo contrario se ingresan los datos en negativo
	
		 {
			"fac_id" : "78907",
			"fac_cli_id" : "305670145",
			"fac_fechacompra" : "2017/07/01",
			"fac_moneda" :"Colones",
			"fac_puntosredim" : "-10000", 
			"fac_articulos" : [
				{"art_sku" : "GHKFJRU0897", "art_cant" : "1", "art_preciouni" : "14600"},
				{"art_sku" : "GHKFJRU0897", "art_cant" : "1", "art_preciouni" : "14600"},
				{"art_sku" : "GHKFJRU0897", "art_cant" : "1", "art_preciouni" : "14600"}
			]
		}
	*/
	app.post("/insertar/factura", function(req, res){
		
		// Capturamos los datos
		var datos = {
			fac_id : req.body.fac_id,
			fac_cli_id : req.body.fac_cli_id,
			fac_fechacompra : req.body.fac_fechacompra,
			fac_moneda : req.body.fac_moneda,
			fac_puntosredim : req.body.fac_puntosredim,
			fac_total : 0,
			fac_articulos : req.body.fac_articulos
		};

		facturaController.insertarFactura(datos, function(error, respuesta){
			console.log("Esta es la respuesta: " + respuesta);
			res.status(200).json({'accion' : 'Insertar Factura', 'Respuesta' : respuesta});
		});

	});
 
}

