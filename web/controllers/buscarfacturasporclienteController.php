<?php

	require_once('core/models/class.factura.php');

	if($_POST) {

		$cedula = $_POST["cedula"]; 

		//Validando los datos
		try {
		    // Se evalúa a true ya que $var está vacia
			if (empty(trim($cedula))) {
			 	throw new Exception('El campo "Cedula" es requerido.');
			}else{
				//Creamos el Cliente
				$factura = new Factura();
				$results = array('mjs' => '0' , 'response' => 'No se ha ejecutado ningun proceso!');

			
				$facturas = $factura->buscarFacturasPorCliente($cedula);
				$results = array('mjs' => '1' , 'response' => $facturas);
					
			}
		} catch(Exception $e) {
		    $results = array('mjs' => '0' ,'response' =>  $e->getMessage());
		}finally{
			echo json_encode($results);
		}

	} else {

		include('public/html/administrarCliente.html');

	}
?>