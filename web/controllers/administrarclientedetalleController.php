<?php
	
	if(isset($_GET['cedula'])){

		include('public/html/administrarClienteDetalle.html');

	} else{
		include('public/html/administrarCliente.html');
	}
?>