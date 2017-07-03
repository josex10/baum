$(document).ready(function(){

	function inicializar(){
		//var cedula = localStorage.getItem('cedulaAdmin');
		
		//Recibimos los datos
		var datos = {
			cedula : localStorage.getItem('cedulaAdmin')
		};


		//Llamar Datos del Cliente
		var request = $.ajax({
	        url: "ajax.php?accion=buscarClienteXCed",
	        type: "post",
	        data: datos, 
	        success : function(data){
	        	var json = $.parseJSON(data);
	        	var isError = json.mjs;
	        	if(isError === '0'){
					alert(json.response);
	        	}else{
					$('#cliCed').val(json.response[0]['cli_id']);
					$('#cliNombre').val(json.response[0]['cli_nombre']);
					$('#cliApellido').val(json.response[0]['cli_apellido']);
					$('#cliTelefono').val(json.response[0]['cli_telefono']);

					if(json.response[0]['cli_estado'] === "1"){
						$('#cliEstado').prop('checked', true);
					}else{
						$('#cliEstado').prop('checked', false);
					}
					$('#cliFechanac').val(json.response[0]['cli_fechanac']);
					$('#cliFechareg').val(json.response[0]['cli_fechareg']);
					//$('#cliPuntos').val(json.response[0]['cli_id']);


	        	}

	        }
	    });

	    //Llamar la cantidad de puntos
	    var request2 = $.ajax({
	        url: "ajax.php?accion=contarpuntospornumfactura",
	        type: "post",
	        data: datos, 
	        success : function(data){

	        	var json = $.parseJSON(data);
	        	var isError = json.mjs;
	        	
	        	if(isError === '0'){
					console.log(json.response);
	        	}else{
					$('#cliPuntos').val(json.response);
	        	}
	        	
	        	

	        }
	    });
	}

	function inicializarTransacciones(){
		//Recibimos los datos
		var datos = {
			cedula : localStorage.getItem('cedulaAdmin')
		};

		var request = $.ajax({
	        url: "ajax.php?accion=buscarFacturasPorCliente",
	        type: "post",
	        data: datos, 
	        success : function(data){
	        	var json = $.parseJSON(data);
	        	var isError = json.mjs;

	        	if(!(json.response.length > 0)){
	        		$("#alertSuccess2").addClass('hidden');
	        		$("#alertErro2r").removeClass('hidden');
					$("#alertError2").addClass('show');
					$('#alertErrorTxt2').text('El cliente no tiene facturas.');
	        	}else{
	        		if(isError === '0'){
		        		$("#alertSuccess").addClass('hidden');
		        		$("#alertError").removeClass('hidden');
						$("#alertError").addClass('show');
						$('#alertErrorTxt').text(json.response);
		        	}else{
	        			$("#alertError2").addClass('hidden');
		        		$("#alertSuccess2").removeClass('hidden');
						$("#alertSuccess2").addClass('show');
						$('#alertSuccessTxt2').text("La consulta fue satisfactoria");
						

						  var tabla   = $("#tablaTransacciones");
						  $('tbody').remove();
						  var tblBody = document.createElement("tbody");
						 
						  // Crea las celdas
						  for (var i = 0; i < json.response.length; i++) {
						    	
						    	// Crea las hileras de la tabla
						    	var hilera = document.createElement("tr");

								var celda = document.createElement("td");
								var textoCelda = document.createTextNode(json.response[i]['fac_id']);
								celda.appendChild(textoCelda);
								hilera.appendChild(celda);

								var celda = document.createElement("td");
								var textoCelda = document.createTextNode(json.response[i]['fac_fechacompra']);
								celda.appendChild(textoCelda);
								hilera.appendChild(celda);

								var celda = document.createElement("td");
								var textoCelda = document.createTextNode(json.response[i]['fac_moneda']);
								celda.appendChild(textoCelda);
								hilera.appendChild(celda);

								var celda = document.createElement("td");
								var textoCelda = document.createTextNode(json.response[i]['fac_puntosredim']);
								celda.appendChild(textoCelda);
								hilera.appendChild(celda);

								var celda = document.createElement("td");
								var textoCelda = document.createTextNode(json.response[i]['fac_total']);
								celda.appendChild(textoCelda);
								hilera.appendChild(celda);                            
						 
						    // agrega la hilera al final de la tabla (al final del elemento tblbody)
						    tblBody.appendChild(hilera);

						  }
						 
						  // posiciona el <tbody> debajo del elemento <table>
						  tabla.append(tblBody);
		        	}
	        	}

	        }
	    });
	}

	inicializar();

	inicializarTransacciones();

	$("#btnActualizar").click(function(){
		//Recibimos los datos
		var estado = 0;
		if( $('#cliEstado').prop('checked') ) {
		    estado = 1;
		}

		var datos = {
			cedula : $('#cliCed').val(),
			nombre : $('#cliNombre').val(),
			apellido : $('#cliApellido').val(),
			telefono : $('#cliTelefono').val(),
			estado :estado
		};


	    var request = $.ajax({
	        url: "ajax.php?accion=actualizarUsuario",
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
					inicializar();
	        	}

	        }
	    });    
	});

});