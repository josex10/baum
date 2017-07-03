<?php 
	
	require_once('core/models/class.cliente.php');
	if($_POST) {

		$cedula = $_POST["cedula"]; 
		$nombre = $_POST["nombre"];
		$apellido = $_POST["apellido"]; 
		$telefono = $_POST["telefono"];  
		$fechaNac = $_POST["fechaNac"];

		//Validando los datos
		try {
		    // Se evalúa a true ya que $var está vacia
			if (empty(trim($cedula))) {
			 	throw new Exception('El campo "Cedula" es requerido.');
			}else if(empty(trim($nombre))){
				throw new Exception('El campo "Nombre" es requerido.');
			}else if(empty(trim($apellido))){
				throw new Exception('El campo "Apellido" es requerido.');
			}else if(empty(trim($telefono))){
				throw new Exception('El campo "Telefono" es requerido.');
			}else if(!is_numeric($telefono)){
					throw new Exception('El campo "Telefono" debe ser numerico.');
			}else if(empty(trim($fechaNac))){
				throw new Exception('El campo "Fecha de Nacimiento" es requerido.');
			}else{
				//Creamos el Cliente
				$cliente = new Cliente();
				$results = array('mjs' => '0' , 'response' => 'No se ha ejecutado ningun proceso!');

				//Validamos si el cliente Existe
				//$exist = $cliente->existeCliente($cedula);
				if(!$cliente->existeCliente($cedula)){
					//$result = $cliente->agregarCliente($cedula, $nombre, $apellido, $telefono, $fechaNac);
					if($cliente->agregarCliente($cedula, $nombre, $apellido, $telefono, $fechaNac)){
						$results = array('mjs' => '1' , 'response' => 'El cliente se creo satisfactoriamente!');
					}else{
						$results = array('mjs' => '0' , 'response' => 'Ocurrio un problema con la creacion del cliente, favor intentar mas tarde!');
					}
					
				}else{
					$results = array('mjs' => '0' , 'response' => 'El cliente ya existe!');
				}

				
			}
		} catch(Exception $e) {
		    $results = array('mjs' => '0' ,'response' =>  $e->getMessage());
		}finally{
			echo json_encode($results);
		}

	} else {

		include('public/html/agregarCliente.html');

	}
	
?>