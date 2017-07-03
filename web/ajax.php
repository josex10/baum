<?php 
	
	if($_POST) {

		require('core/core.php');

		switch (isset($_GET['accion']) ? $_GET['accion'] : null) {

			case 'crearUsuario':
				require('controllers/agregarclienteController.php');
				break;

			case 'buscarClienteXCed':
				require('controllers/buscarClienteXCedController.php');
				break;

			case 'buscarTodosLosClientes':
				require('controllers/buscarTodosLosClientesController.php');
				break;

			case 'actualizarUsuario':
				require('controllers/actualizarusuarioController.php');
				break;

			case 'buscarFacturasPorCliente':
				require('controllers/buscarfacturasporclienteController.php');
				break;

			case 'contarpuntospornumfactura':
				require('controllers/contarpuntospornumfacturaController.php');
				break;

			default:
				header('location: index.php');
				break;

		}

	} else {

		header('location: index.php');

	}
?>