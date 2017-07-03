$(document).ready(function(){

	function adminCliente(){
		
		var cedula = this.id;
		window.location.href='?view=administrarclientedetalle&cedula=' + cedula;
		localStorage.setItem('cedulaAdmin',cedula);
	}

	$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	});

	$('#btnBuscarCliente').click(function(){

		//Recibimos los datos
		var datos = {
			cedula : $('#frmBuscarClienteXCed').val()
		};

		var request = $.ajax({
	        url: "ajax.php?accion=buscarClienteXCed",
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
					$('#alertSuccessTxt').text("La consulta fue satisfactoria");
					




					 
					  // Crea un elemento <table> y un elemento <tbody>
					  var tabla   = $("#tablaClientes");
					  $('tbody').remove();
					  var tblBody = document.createElement("tbody");
					 
					  // Crea las celdas
					  for (var i = 0; i < json.response.length; i++) {
					    // Crea las hileras de la tabla
					    var hilera = document.createElement("tr");
					 
					    for (var j = 0; j < json.response.length; j++) {
							// Crea un elemento <td> y un nodo de texto, haz que el nodo de
							// texto sea el contenido de <td>, ubica el elemento <td> al final
							// de la hilera de la tabla
							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_id']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_nombre']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_apellido']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_fechanac']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_telefono']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var estado = "Deshabilitado";
							if(json.response[i]['cli_estado'] === '1'){
								estado = 'Habilitado';
							}
							var textoCelda = document.createTextNode(estado);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							
					      	var btn = document.createElement("submit");        
							var t = document.createTextNode("Administrar"); 
							btn.setAttribute("id", json.response[i]['cli_id']); 
							btn.setAttribute("class", 'btn btn-primary' ); 
							btn.addEventListener('click', adminCliente, false);  
							btn.appendChild(t);   

							celda.appendChild(btn); 
							hilera.appendChild(celda);                             
					    }
					 
					    // agrega la hilera al final de la tabla (al final del elemento tblbody)
					    tblBody.appendChild(hilera);
					  }
					 
					  // posiciona el <tbody> debajo del elemento <table>
					  tabla.append(tblBody);


	        	}

	        }
	    });
	});

	$('#btnBuscarTodos').click(function(){
		//Recibimos los datos
		var datos = {
			accion : 'buscarTodos'
		};

		var request = $.ajax({
	        url: "ajax.php?accion=buscarTodosLosClientes",
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
					$('#alertSuccessTxt').text("La consulta fue satisfactoria");

					  // Crea un elemento <table> y un elemento <tbody>
					  var tabla   = $("#tablaClientes");
					  $('tbody').remove();
					  var tblBody = document.createElement("tbody");
					 
					  // Crea las celdas
					  for (var i = 0; i < json.response.length; i++) {
					    // Crea las hileras de la tabla
					    var hilera = document.createElement("tr");
					 
					   
							// Crea un elemento <td> y un nodo de texto, haz que el nodo de
							// texto sea el contenido de <td>, ubica el elemento <td> al final
							// de la hilera de la tabla
							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_id']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_nombre']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_apellido']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_fechanac']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var textoCelda = document.createTextNode(json.response[i]['cli_telefono']);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							var estado = "Deshabilitado";
							if(json.response[i]['cli_estado'] === '1'){
								estado = 'Habilitado';
							}
							var textoCelda = document.createTextNode(estado);
							celda.appendChild(textoCelda);
							hilera.appendChild(celda);

							var celda = document.createElement("td");
							
					      	var btn = document.createElement("submit");        
							var t = document.createTextNode("Administrar"); 
							btn.setAttribute("id", json.response[i]['cli_id']); 
							btn.setAttribute("class", 'btn btn-primary' ); 
							btn.addEventListener('click', adminCliente, false);  
							btn.appendChild(t);   

							celda.appendChild(btn); 
							hilera.appendChild(celda);                             
					    
					 
					    // agrega la hilera al final de la tabla (al final del elemento tblbody)
					    tblBody.appendChild(hilera);
					  }
					 
					  // posiciona el <tbody> debajo del elemento <table>
					  tabla.append(tblBody);


	        	}

	        }
	    });
	});
});