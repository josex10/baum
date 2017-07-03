$(document).ready(function(){

	$('.frmNuevoClienteFechaNac').datepicker({ 
     dateFormat: 'Y/m/d'
     }).datepicker("setDate", new Date());

	//Funcion para crear el cliente
	$('#btnAgregarCliente').click(function(){

		//Recibimos los datos
		var datos = {
			cedula : $('#frmNuevoClienteCedula').val(),
			nombre : $('#frmNuevoClienteNombre').val(),
			apellido : $('#frmNuevoClienteApellido').val(),
			telefono : $('#frmNuevoClienteTelefono').val(),
			fechaNac : $('#frmNuevoClienteFechaNac').val()
		};


	    var request = $.ajax({
	        url: "ajax.php?accion=crearUsuario",
	        type: "post",
	        data: datos, 
	        success : function(data){
	        	var json = $.parseJSON(data);
	        	var isError = json.mjs;
	        	if(isError === '0'){
	        		$("#alertSuccess").addClass('hidden');
	        		$("#alertError").removeClass('hidden');
					$("#alertError").addClass('show');
					$('#alertErrorTxt').text(json.response);
	        	}else{
        			$("#alertError").addClass('hidden');
	        		$("#alertSuccess").removeClass('hidden');
					$("#alertSuccess").addClass('show');
					$('#alertSuccessTxt').text(json.response);
					limpiarEspacios();
	        	}

	        }
	    });
	});

	//Funcion para limpiar los espacios
	function limpiarEspacios(){
		$('#frmNuevoClienteCedula').val('');
		$('#frmNuevoClienteNombre').val('');
		$('#frmNuevoClienteApellido').val('');
		$('#frmNuevoClienteTelefono').val('');
		$('#frmNuevoClienteFechaNac').val('');
	}
});