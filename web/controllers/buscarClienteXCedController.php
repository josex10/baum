<?php

	require_once('core/models/class.cliente.php');

	if($_POST) {

		$cedula = $_POST["cedula"]; 

		//Validando los datos
		try {
		    // Se evalúa a true ya que $var está vacia
			if (empty(trim($cedula))) {
			 	throw new Exception('El campo "Cedula" es requerido.');
			}else{
				//Creamos el Cliente
				$cliente = new Cliente();
				$results = array('mjs' => '0' , 'response' => 'No se ha ejecutado ningun proceso!');

				//Validamos si el cliente Existe
				if(!$cliente->existeCliente($cedula)){
					$results = array('mjs' => '0' , 'response' => 'El cliente no existe!');
				}else{
					$clientes = $cliente->buscarClientePorId($cedula);
					$results = array('mjs' => '1' , 'response' => $clientes);
				}

				
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