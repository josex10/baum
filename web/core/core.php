<?php 

/*
	EL NUCLEO DE LA APLICACION
*/

#Constantes de conexión
//define('DB_HOST','aurora.crchost.com');
define('DB_HOST','localhost');
define('DB_USER','jodevelo_admin');
define('DB_PASS','Sportage2016');
define('DB_NAME','jodevelo_planLealtad');

#Constantes de la APP
define('APP_TITLE' , 'Mi Sitio');

#Estructura
require('core/models/class.conexion.php');
require('core/models/class.cliente.php');
require('core/models/class.factura.php');
require('core/models/class.puntos.php');

?>