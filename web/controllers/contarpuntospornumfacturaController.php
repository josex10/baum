<?php

	require_once('core/models/class.cliente.php');
	require_once('core/models/class.factura.php');

	if($_POST) {

		$cedula = $_POST["cedula"]; 

		//Validando los datos
		try {
		    	
			$results = array('mjs' => '0' , 'response' => 'No se ha ejecutado ningun proceso!');
			
			//Nueva Parte
			//Consultamos los puntos por cada factura
			$puntos = new Puntos();
			$totalPuntos = $puntos->totalPuntosDisponiblesTest($cedula);		

			$results = array('mjs' => '1' , 'response' => $totalPuntos);	
			
		} catch(Exception $e) {
		    $results = array('mjs' => '0' ,'response' =>  $e->getMessage());
		}finally{
			echo json_encode($results);
		}

	} else {

		include('public/html/administrarCliente.html');

	}
?>