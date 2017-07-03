<?php

	require_once('core/models/class.cliente.php');

	if($_POST) {

		$accion = $_POST["accion"]; 

		//Validando los datos
		try {
		    // Se evalúa a true ya que $var está vacia
			if ($accion === 'buscarTodos') {
			 	//Creamos el Cliente
				$cliente = new Cliente();
				$results = array('mjs' => '0' , 'response' => 'No se ha ejecutado ningun proceso!');

				
				$clientes = $cliente->buscarTodosLosClientes();
				$results = array('mjs' => '1' , 'response' => $clientes);
				
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