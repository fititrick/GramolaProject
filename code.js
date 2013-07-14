$(document).ready(function(){
	// hide alert boxes
	$('#LogOut').hide();
	$('#Perfil').hide();
	$('#MainPage').hide();
	$( "#tabs" ).tabs();
	$( "#tabs2" ).tabs();
	$('#tabs2').hide();
	$( "#tabs-2" ).tabs();
	$( "#tabsPerfil" ).tabs();
	$( '#tabsPerfil' ).hide();

	
	
	var lolailo=$("#TableLinks");
	$(lolailo).tablesorter();
	// empty() function used when there is nothing entered
	//$('#nameList').empty('');
	
   // lets declare the variables for easier usage
   var user = $('#user');
   var pass = $('#pass');
   var button = $('.button');
   var registro = $('#register');
   var login= $('#BLogin');
   var lista = $('.list');
    var ListNew=$('#btnNewList');
    var BotonUpdate=$('#update');
    var LinkNew=$('#btnNewLink');
   // checking if there is nothing submitted
   
   var logOut= $('#LogOut1');
   var Perfil= $('#Perfil1');
   var MainPage=$('#MainPage1');
   $.ajax({
			type:'POST', url: 'sesionIniciada.php',
			success: function(response) { 
				if(response==true){
					$.ajax({
						type:'POST', url: 'getUser.php',
						success: function(response2) { 
							fLogin("Session started by "+response2);
							}
						
					});
				}
			}
		});
	
   $(logOut).click(function(){
   		$.ajax({
			type:'POST', url: 'logOut.php',
			success: function(response) {  	
				$('#DLogin').fadeIn();
				$('#LogOut').hide();
				$('#tabs2').remove();			
				location.reload(true);
   				$('#ContactForm').find('.form_result').html(response);
   				
			}
		});
		 
   });
   
   	
   
   $(Perfil).click(function(){
   		$.ajax({
			type:'POST',
			 url: 'Perfil.php',
			success: function(response) { 
				$('#tabs2').hide();	
				$('#Perfil').hide();
				$('#MainPage').fadeIn();
				$('#tabsPerfil').fadeIn();		
   				$('#ContactForm').find('.form_result').html(response);
   				
			}
		});
		 
   });
   
   $(MainPage).click(function(){
   		$.ajax({
			type:'POST',
			 url: 'MainPage.php',
			success: function(response) { 
				$('#MainPage').hide();
				$('#DLogin').hide();
				$('#LogOut').fadeIn();
   				$('#tabs2').fadeIn();
   				$('#Perfil').fadeIn();
   				$('#tabsPerfil').hide();		
   				$('#ContactForm').find('.form_result').html(response);
   				
			}
		});
		 
   });
   
   
   
   
   
   
   
   
   
    $(ListNew).click(function(){
			   $.ajax({
			   		type:'POST',
			   		url: 'newlist.php',
			   		data:$('#txtNewList').serialize(),
			   		success: function(response) {  	
		   				$('#ContactForm').find('.form_result').html(response);
		   				
					}
			   });
	});
	$(LinkNew).click(function(){
				
		//aqui deberias de mirar con un if si el proveedor es youtube, solo en ese caso se hace el substring!
		//guardo en la variable el proveedor
		var provider=document.getElementById("select-choice-1").value;
		//si es youtube, realiza el filtro del enlace		
		if(provider=="youtube"){
			var finalId=document.getElementById("urlLink").value
			
			var c13=document.getElementById("urlLink").value.substring(12,13);
			alert(c13);
			if(c13=="."){
				finalId=document.getElementById("urlLink").value.substring(16);
				alert(finalId);
				document.getElementById("urlLink").value=finalId;
			}
			else{
				finalId=document.getElementById("urlLink").value.substring(31,42);			
				document.getElementById("urlLink").value=finalId;
			}			
		}
			   $.ajax({
			   		type:'POST',
			   		url: 'newLink.php',
			   		data:$('#divNewLink').serialize(),
			   		success: function(response) {  	
		   				$('#ContactForm').find('.form_result').html(response);
		 //tras lanzar el mensaje de link insertado, borra todo lo escrito en el formulario sustituyéndolo por "".
		   				document.getElementById("urlLink").value="";
		   				document.getElementById("number-pattern").value="";
		   				document.getElementById("singerLink").value="";	
		   				document.getElementById("songNameLink").value="";			
			

		   				
					}
					
			   });
			   
			  /* $('#urlLink').value='';
			   $('#select-choice-1').value='';
			   $('#number-pattern').value='';
			   $('#singerLink').value='';
			   $('#Links').hide();
			   $.ajax({        
				             url:'links2.php',        
				             type:'post',                 
				             dataType:'html',  
				             cache: false,            
				             success:data2
					   
				        }); */
	});
		
		$(TableLinks).click(function(){
			if(document.getElementsByName("TableLinks")){
				//alert(this.getElementByName("button").getAttribute("value"));
				alert($(document.getElementsByName("TableLinks")[0].childNodes[0].toString));
				alert("pasa");
			}
  		
  		});	
  	function deleteLink(){
  			//definir funcion ajax que llame a deleteLink.php que has de crear, y pasas este idLink como parametro
  			
  			 
  			 	var param= 'idLinkBorrar=' + this.name;
  	
				
				if (confirm('Do you want remove this song?'))
				{
					$.ajax({        
								             url:'borrarLink.php',        
								             type:'post',                 
								             dataType:'html',  
								             data:param,          
								             cache: false,            
								             success: function (response) {
													if (response==true)
													{
														 alert('The song has been deleted');
							
													}				   
													else
													{
														alert('The song hasn´t been deleted');
							
													}
											 }     
								        }); 
				}
				
				
				
				
		
  	}
  	
  	
  	
  	  	function deleteList(){
  			//definir funcion ajax que llame a deleteLink.php que has de crear, y pasas este idLink como parametro
  			
  			 
  			 	var param= 'idLinkBorrar=' + this.name;
  	
				
				if (confirm('Do you want to remove this list?'))
				{
					$.ajax({        
								             url:'borrarLista.php',        
								             type:'post',                 
								             dataType:'html',  
								             data:param,          
								             cache: false,            
								             success: function (response) {
													if (response==true)
													{
														 alert('The list has been deleted');
							
													}				   
													else
													{
														alert('The list hasn´t been deleted');
							
													}
											 }     
								        }); 
				}
				
				
				
				
		
  	}
  	
  	
  	
  	
  	
  	
  	

    $(button).click(function(){
	
	if(document.getElementById("user").value.length < 3 && document.getElementById("user1").value.length< 3){
		alert("You must write your data");

		location.reload(true);
				return false;
	}
	else if(document.getElementById("pass").value.length < 3 && document.getElementById("pass1").value.length < 3){
		alert("You must write your password");
		alert(document.getElementById("user").value);

		location.reload(true);
	}
	return false;
	
   });
  
	$(registro).click(function(){
	
		$.ajax({
			type:'POST', 
			url: 'registro.php', 
			data:$('#registro').serialize(),
			success: function(response) {  	
   				$('#ContactForm1').find('.form_result1').html(response);
   				
   				$('#DLogin').hide();
				$('#LogOut').fadeIn();
   				$('#tabs2').fadeIn();
   				$('#Perfil').fadeIn();
			},
			error: function (response) {
                        alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
		});
		

   });
   
   $(BotonUpdate).click(function(){
   	$('#Links').hide();
   	
   		$.ajax({        
		             url:'lists.php',        
		             type:'post',                 
		             dataType:'html',            
		             cache: false,            
		             success:data     
		        }); 
		     
   });
   
    $(login).click(function(){
		$.ajax({
			type:'POST', url: 'mensaje.php', data:$('#login').serialize(),
			success: fLogin,
			error: function(objeto, quepaso, otroobj) {
                         //   alert("Estas viendo esto por que fallé");
                         //   alert("Pasó lo siguiente: " + objeto);
                         //   alert("Pasó lo siguiente: " + quepaso);
                         //   alert("Pasó lo siguiente: " + otroobj);
                        }
			
		});
		
   });
   function fLogin(response) { 
				$('#DLogin').hide();
				$('#desaparecer').hide();
				$('#LogOut').fadeIn();
				$('#Perfil').fadeIn();
				$('#tabs2').fadeIn();
   				$('#ContactForm').find('.form_result').html(response);
   				$.ajax({        
		             url:'lists.php',        
		             type:'post',                 
		             dataType:'html',            
		             cache: false, 
		             //cuando la llamada del ajax devuelve algo, llega a success, y el succes llama a la funcion data
		             success:data     
		        }); 
			}
        
        //la funcion data mete en el onclick de los links funcionalidad
   function data (html) {
            var $html = $( html ); // create DOM elements in a jQuery object
            function cambiaOnClickListas(){
        		this.cambia = function cambia(donde){
        			$('#Links').fadeIn();
		            donde.innerHTML = html;
		           var vector= document.getElementsByClassName('list');
		            for(var i=0;i<vector.length;i++){
		            	vector[i].onclick = this.muestraLinks;     
		            }
                       
      			 };
      			 //esta funcion ajax es distinta, ya que envía un parametro que tu has determinado
		        this.muestraLinks = function muestraLinks(){            
				  	var param= 'id=' + this.name;
				  	$.ajax({        
				             url:'links.php',        
				             type:'post',                 
				             dataType:'html',  
				             data:param,          
				             cache: false,            
				             success:data2     
				        }); 
				        function data2 (html2) {
				            
				            //$html.filter('.list').appendTo("#nameList");
				            //$('#Links').find('#nameLinks').html(html);
				            function cambiaOnClickLinks(){
				            	this.change=function change(where){
				            		where.innerHTML=html2;
				            		//$('#Links').find('#nameLinks').html(html2);
				            		//aqui lo que hago es buscar en la pagina index.html todos los elementos que hay con la clase=link
				            		//vector almancena en cada casilla uno de esos elementos
				            		//modifico su onclick para que llamen a la funcion reproductor
				            		//vector.length te marca cuantas canciones hay
				            		//y lo mas importate es que cada cancion tiene un posList (una posicion en la lista de reproductio)
				            		//lo que entiendo yo es que si reproduces la 4, la siguiente sea la 5....
				            		//ahora ve a funcion reproductor
									var vector= document.getElementsByClassName('link');
						            for(var i=0;i<vector.length;i++){
						            	vector[i].onclick = reproductor;
						            }
						            var vector3=document.getElementsByClassName('buttonDelLink');
						            for(var i=0;i<vector3.length;i++){
						                  	vector3[i].onclick = deleteLink;
						            }
						            
						              var vectorList=document.getElementsByClassName('buttonBList');
						            for(var i=0;i<vectorList.length;i++){
						                  	vectorList[i].onclick = deleteList;
						            }
						            
						            
						            
						            var vector2= document.getElementsByClassName('linkIcon');
						            //alert(vector2.length);
						           //$('#providerTabla').text("adios");
						          
						            for(var j=0;j<vector2.length;j++){
						            	//alert(vector2[j].innerText);
						            	if(vector2[j].innerText=='youtube'){
						            		vector2[j].innerHTML= '<image style="width=60px height=60" src="./images/youtube.png">';
						            	}
						            	if(vector2[j].innerText=='goear'){
						            		vector2[j].innerHTML= '<image style="width=60px height=60px" src="./images/goear.png">';
						            	}
						            	if(vector2[j].innerText=='spotify'){
						            		vector2[j].innerHTML= '<image style="width=50px height=50px" src="./images/spotify.png">';
						            	}
						            	if(vector2[j].innerText=='mp3'){
						            		vector2[j].innerHTML= '<image style="width=50px height=40px" src="./images/music.png">';
						            	}
						            	
						            }
						            //aqui toca hacer lo mismo que ahora pero buscando la clase de la x y recorriendolo añadiendole
						            //una funcion que borre el link
						            
				            	};
				            	//cuando pulsa un link llama a esta funcion, el caso es saber que poscion en la lista tiene esta cancion
				            	function reproductor(){
				            		//primero recorrer el vector liksOrdenados[] buscando que el link sea el mismo que te llega al reproductor
				            		//el link que te llega al reproductor es this.name
				            		//buscas this.name en el vector y esa posicion es la que tiene la cancion
				            		//al final de la reproduccion (algo que tienes que controlar porque nose como)
				            		//llamarias recursivamete/o secuencialmente a esta funcion reproductor con la siguiente cancion y el mismo vector
				            		//problemas: saber cuando termina de reproducirse
				            		
				            		var code;
				            	 
				            		switch(this.title)
										{
											
										case "spotify":
										   code='<iframe width="300" height="380" src="'+this.name+'" frameborder="1" allowtransparency="true" autoplay="1" ></iframe>';
										  break;
										case "youtube":
										   code='<iframe width="560" height="315" src="//www.youtube.com/embed/'+this.name+'?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>';
										  break;
										case "goear":
										   code='<iframe width="560" height="315" src="http://www.goear.com/files/external.swf?file='+this.name+'" frameborder="1"></iframe>';
										  break;
										default:
										   code='<iframe width="560" height="315" src="'+this.name+'" frameborder="1" allowfullscreen ></iframe>';
									}
				            		
   										document.getElementById("player").innerHTML=code;
   										/*
   										function get_youtube_embed($youtube_video_id, $autoplay=true)
										{
											$embed_code = "";
										 
											if($autoplay)
												$embed_code = '<embed src="http://www.youtube.com/v/'.$youtube_video_id.'&rel=1&autoplay=1" pluginspage="http://adobe.com/go/getflashplayer" type="application/x-shockwave-flash" quality="high" width="480" height="395" bgcolor="#ffffff" loop="false"></embed>';
											else
												$embed_code = '<embed src="http://www.youtube.com/v/'.$youtube_video_id.'&rel=1" pluginspage="http://adobe.com/go/getflashplayer" type="application/x-shockwave-flash" quality="high" width="450" height="376" bgcolor="#ffffff" loop="false"></embed>';
											return $embed_code;
										}
										*/
  									 };
				            }
				            var objetoLinks = new cambiaOnClickLinks();
				            objetoLinks.change(document.getElementById("Links"));
				        }
		        };
    		}
		    var objeto2 = new cambiaOnClickListas();  
		    objeto2.cambia(document.getElementById("div-clase2")); 
		    
		}
  
  		
			
 });