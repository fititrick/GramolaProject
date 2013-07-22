$(document).ready(function(){
//////VARIABLES
	var tablePerfil=$("#TablePerfil");
///////////////////////////////////////////////////////////////////////////////	
	playlist = new Playlist(null);	//defino la playList, con un numero de canciones de 0, un id de null y una primera cancion de null
	///////////////////////////////////////////////////////////////////////////////////////////
	// empty() function used when there is nothing entered
	//$('#nameList').empty('');
	
   // lets declare the variables for easier usage
   var user = $('#user');
   var pass = $('#pass');
   var button = $('.button');
   var registro = $('#register');
   var cambiapass = $('#cambiapass');
   var cambianick = $('#cambianick');
   var cambiaemail = $('#cambiaemail');
   var cambiaImagen = $('#cambiaImagen');
   var login= $('#BLogin');
   var lista = $('.list');
    var ListNew=$('#btnNewList');
     var ListNewShare=$('#btnNewListShare');
    var BotonUpdate=$('#update');
    var LinkNew=$('#btnNewLink');
   // checking if there is nothing submitted
   
   var logOut= $('#LogOut1');
   var Perfil= $('#Perfil1');
   var MainPage=$('#MainPage1');
   var changePass=$('#changePass');
   var changeNick=$('#changeNick');
   var changeEmail=$('#changeEmail');
   var changeImage=$('#changeImage');
   var sendfile=$('#sendfile');
   var enviararchivo=$('#enviararchivo');
   
   
   

//Capturamos la URL 
var callingURL = document.URL;


//Separamos los parametros 
var cgiString = callingURL.substring(callingURL.indexOf('?')+1,callingURL.length); 

//Fijamos el sepador entre parametros 
var DELIMETER = '&'; 

//Eliminamos la almohadilla, si es que existe... cortamos por lo sano! 
if (cgiString.indexOf('#')!=-1){ 
    cgiString=cgiString.slice(0,cgiString.indexOf('#')); 
} 

//Troceamos el cgiString ya limpiado, separando cada par variable=valor 
//en una de las posiciones del array 
var arrayParams=cgiString.split(DELIMETER); 
var idListaCompartida=eval(arrayParams[0].substring(0,arrayParams[0].indexOf('=')+1)+"\""+ 
	    arrayParams[0].substring(arrayParams[0].indexOf('=')+1,arrayParams
	     [0].length)+"\""); 
///////////////////////////////////////////////////////////////////////////////
	if(idListaCompartida!="http://gramola.sytes.net/GramolaProject/" && idListaCompartida!="http://gramola.sytes.net/GramolaProject/index.html" && idListaCompartida!="http://gramola.sytes.net/" ){  //esto es lo que hago si me llega una lista compartida.
		
	 window.location=("#p_links");
	    
	     $('#contenedor').hide();
	   //  $('#p_links').fadeIn();
	     $( "#tabsShare" ).tabs();
	     
	 //Primero mirar a ver si estoy logueado, si nolo estoy, mostrar solo tabla con links
	  $.ajax({
			type:'POST', url: 'sesionIniciada.php',
			success: function(response) { 
				if(response==true){//si hay sesion
					$.ajax({
						type:'POST', url: 'getUser.php',
						success: function(response2) { 
							fLogin("Session started by "+response2);
							$.ajax({
								type:'POST',
								url:'profileButton.php',
								success:function(response){
								$('#PerfilShare').html(response);
								
								document.getElementById('Perfil5').onclick=mainProfile;
								document.getElementById('Perfil5').className='button';  
							
								}
							});
							}
							
					});
					$('#LogOutShare').html('<button id="LogOut1Share" class="b_LogOut" type="submit" data-theme="e" >LOG OUT</button>');
					$('#SaveSharedList').html('<h3>Save List</h3><input id="txtNewListShare" type="text" name="name" value="List name"  onblur="if(this.value == "") { this.value="List name"}" onfocus="if (this.value == "List name") {this.value=""}" /><a id="btnNewListShare" data-role="button" data-inline="true" data-theme="e">Save</a>');
				}
				else{
					
				}
			}
		});
		//si estoy logueado SaveSharedList aparecera, sino solo la de compartir
		var param= 'id=' + idListaCompartida;	
		document.f2.campo1.value="http://gramola.sytes.net/index.html?v="+idListaCompartida;
	  	//document.getElementById('b_BorrarLista').innerText= "Delete ";
	  	//alert(document.getElementById('b_BorrarLista').innerText);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
	  	playList.delPlayList();//La borro para que cada vez que pincha en un boton lista, cree una playList nueva, sino se agregaria uno detras de otro
		playlist.setId(this.name);//aqui marco el id de la lista de dodne salen los links de dentro del playList
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7					
	  	$.ajax({        
	             url:'linksWithoutConexion.php',        
	             type:'post',                 
	             dataType:'html',  
	             data:param,          
	             cache: false,            
	             success:linksShare     
	        }); 
	 $('#b_facebookShare').click(function(){
	             
		var url="http://www.facebook.com/sharer.php?u=http://gramola.sytes.net/index.html?v="+idListaCompartida+"&t=Compartiendo Lista:"+idListaCompartida;
		nuevaVentana=window.open(url, "segundaPag","toolbar=yes,location=no,resizable=no,height=200" );
					
  	});
  	$('#b_twitterShare').click(function(){
  		var dir = "http://gramola.sytes.net/index.html?v="+idListaCompartida;
	var dir2 = encodeURIComponent(dir);
	var tit = "Shared the list nº "+idListaCompartida+ " of Gramola ";
	var tit2 = encodeURIComponent(tit);

		var url='http://twitter.com/?status='+tit2+'%20'+dir2+''
		nuevaVentana=window.open(url, "segundaPag","toolbar=yes,location=no,resizable=no,height=500" );
  	});
  	
function linksShare (links) {
	//    $('#lista').fieldcontain("refresh");   
	            //$html.filter('.list').appendTo("#nameList");
	            //$('#Links').find('#nameLinks').html(html);
	            
	            function cambiaOnClickLinks(){
	            	this.change=function change(where){
	            		where.innerHTML="";
	            		$('#TableLinksShare').append(links);
	            		//$('#Links').find('#nameLinks').html(html2);
	            		//aqui lo que hago es buscar en la pagina index.html todos los elementos que hay con la clase=link
	            		//vector almancena en cada casilla uno de esos elementos
	            		//modifico su onclick para que llamen a la funcion reproductor
	            		//vector.length te marca cuantas canciones hay
	            		//y lo mas importate es que cada cancion tiene un posList (una posicion en la lista de reproductio)
	            		//lo que entiendo yo es que si reproduces la 4, la siguiente sea la 5....
	            		//ahora ve a funcion reproductor
	            			
						var vector= document.getElementsByClassName('linkshared');
						
			            for(var i=0;i<vector.length;i++){
			            	vector[i].onclick = reproductorShared;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

			            	playlist.addSong(new Song(vector[i].name, null));
			            	//añado todas las canciones una a una en la playList, se encarga el propio metodo por dentro de añadirle a cada cancion el id de la lista a la que pertenece
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
			           }
			           
			           //alert(playList.getNumberSongs());			            
			            var vector3=document.getElementsByClassName('buttonDelLink');
			            for(var i=0;i<vector3.length;i++){
			                  	vector3[i].onclick = deleteLink;
			            }
			            
			              var vectorList=document.getElementsByClassName('buttonBList');
			            for(var i=0;i<vectorList.length;i++){
			                  	vectorList[i].onclick = deleteList;
			            }
			            
			             var vectorVList=document.getElementsByClassName('buttonVList');
			            for(var i=0;i<vectorVList.length;i++){
			                  	vectorVList[i].onclick = voteList;
			            }
			            
			             var vectorVotes=document.getElementsByClassName('buttonOfVotes');
			            for(var i=0;i<vectorVotes.length;i++){
			                  	vectorVotes[i].onclick = setVote;
			             

			            }
			            
			            
			            
			            var vector2= document.getElementsByClassName('linkIcon');
			            //alert(vector2.length);
			           //$('#providerTabla').text("adios");
			          
			            for(var j=0;j<vector2.length;j++){
			            	//alert(vector2[j].innerText);
			            	if(vector2[j].innerText=='youtube'){
			            		vector2[j].innerHTML= '<image style="width=60px height=60" src="./images/youtube.png">';
			            		(playlist.getElement(j)).setProvider("youtube");
			            	}
			            	if(vector2[j].innerText=='goear'){
			            		vector2[j].innerHTML= '<image style="width=60px height=60px" src="./images/goear.png">';
			            		playlist.getElement(j).setProvider("goear");
			            	}
			            	if(vector2[j].innerText=='spotify'){
			            		vector2[j].innerHTML= '<image style="width=50px height=50px" src="./images/spotify.png">';
			            		playlist.getElement(j).setProvider("spotify");
			            	}
			            	if(vector2[j].innerText=='mp3'){
			            		vector2[j].innerHTML= '<image style="width=50px height=40px" src="./images/music.png">';
			            		playlist.getElement(j).setProvider("mp3");
			            	}
			            	
			            }
	            	
	            	document.getElementById ("TableLinks").listview("refresh");
			            //aqui toca hacer lo mismo que ahora pero buscando la clase de la x y recorriendolo añadiendole
			            //una funcion que borre el link
			          
			            $("#TableLinksShare").tablesorter();
	            	};
	            	
	            	
	            }
	            var objetoLinks = new cambiaOnClickLinks();
	            objetoLinks.change(document.getElementById("LinksShare"));
	            
	            
	        }
	        //cuando pulsa un link llama a esta funcion, el caso es saber que poscion en la lista tiene esta cancion
	            	function reproductorShared(){
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
	            		
							document.getElementById("playerShare").innerHTML=code;
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
else{//si me llega una lista sin compartir
	$('#LogOut').hide();
	$('#Perfil').hide();
	$('#MainPage').hide();
	$( "#tabs" ).tabs();
	$( "#tabs2" ).tabs();
	$('#tabs2').hide();
	$( "#tabs-2" ).tabs();
	$( "#tabsPerfil" ).tabs();
	$( '#tabsPerfil' ).hide();
	$('#div_BorrarLista').hide();
	$('#div_VoteList').hide();
	// $('#contenedor').fadeIn();
	 // $('#p_links').hide();
	
   
   $.ajax({
			type:'POST', url: 'sesionIniciada.php',
			success: function(response) { 
				if(response==true){
					$.ajax({
						type:'POST', url: 'getUser.php',
						success: function(response2) { 
							fLogin("Session started by "+response2);
							$.ajax({
								type:'POST',
								url:'profileButton.php',
								success:function(response){
								$('#Perfil').html(response);
								
								document.getElementById('Perfil5').onclick=mainProfile;
								$('#Perfil5').css("background-color","lightgreen");  
							
								}
							});
							}
							
					});
				}
			}
		});
}
//fin else
		function mainProfile(){
			$.ajax({
				type:'POST',
				 url: 'Perfil.php',
				success: function(response) { 
					$('#tabs2').hide();	
					$('#Perfil').hide();
					$('#MainPage').fadeIn();
					$('#tabsPerfil').fadeIn();
					$('#PerfilContainer').html(response);		
					             
	   				
				}
			});
									
		}
	
   $('.b_LogOut').click(function(){
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
   
   $(cambiapass).click(function(){
	
		$.ajax({
			type:'POST', 
			url: 'changePass.php', 
			data:$('#changepass').serialize(),
			cache: false,
			success: function(response) {  	
   				$('#ContactForm').find('.form_result').html(response);
   					document.getElementById("nickpass").value="";
		   			document.getElementById("newnickpass").value="";
		   			document.getElementById("actualpass").value="";	
		   			document.getElementById("newpass").value="";	
					document.getElementById("confnewpass").value="";
	   				alert("tu pass ha sido cambiado");	
	   				location.reload(true);

			},
			error: function (response) {
                        alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
		});
		

   });
   
    $(cambianick).click(function(){
	
		$.ajax({
			type:'POST', 
			url: 'changeNick.php', 
			data:$('#changeNick').serialize(),
			cache: false,
			success: function(response) {
				document.getElementById("newnickpass").value="";
		   			document.getElementById("confnewnick").value="";	
		   			document.getElementById("actualpassnick").value="";  
				alert(response);	
		   			
		   			$.ajax({
								type:'POST',
								url:'profileButton.php',
								success:function(response){
								$('#Perfil').html(response);
								
								document.getElementById('Perfil5').onclick=mainProfile;
								$('#Perfil5').css("background-color","lightgreen");  
							
								}
							});
   						//location.reload(true);
   						
   				

			},
			
			error: function (response) {
                        alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
		});
		

   });
   
   
    $(cambiaemail).click(function(){
	
		$.ajax({
			type:'POST', 
			url: 'changeEmail.php', 
			data:$('#changeEmail').serialize(),
			cache: false,
			success: function(response) {  	
   				$('#ContactForm').find('.form_result').html(response);
   					document.getElementById("email").value="";
		   			document.getElementById("newemail").value="";
		   			document.getElementById("confnewemail").value="";	
		   			document.getElementById("actualpassemail").value="";	
		   			alert("tu email ha sido cambiado");	
   				location.reload(true);

			},
			error: function (response) {
                        alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
		});
		

   });
   
   $(cambiaImagen).click(function(){
	
		$.ajax({
			type:'POST', 
			url: 'changeImage.php', 
			data:$('#changeImage').serialize(),
			cache: false,
			success: function(response) {  	
   				$('#ContactForm').find('.form_result').html(response);
   					document.getElementById("imageLink").value="";
		   				

			},
			error: function (response) {
                        alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
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
		   				updateLists();
					}
			   });
			   
			   
		     
	   
	});
	$(ListNewShare).click(function(){
			   $.ajax({
			   		type:'POST',
			   		url: 'copylist.php',
			   		data:$('#txtNewListShare').serialize(),
			   		success: function(response) {  	
		   				alert(response);
		   				//llamada a la principal
		   				window.location=("#p_links");
						$('#contenedor').hide();
					   //  $('#p_links').fadeIn();
					}
			   });
			   
			   
		     
	   
	});
	
	function updateLists(){
   		$('#Links').hide();
   	
   		$.ajax({        
		             url:'lists.php',        
		             type:'post',                 
		             dataType:'html',            
		             cache: false,            
		             success:data     
		        }); 
		     
   }
  
	$(LinkNew).click(function(){
				
		//aqui deberias de mirar con un if si el proveedor es youtube, solo en ese caso se hace el substring!
		//guardo en la variable el proveedor
		var provider=document.getElementById("select-choice-1").value;
		//si es youtube, realiza el filtro del enlace		
		if(provider=="youtube"){
			var finalId=document.getElementById("urlLink").value
			
			var c13=document.getElementById("urlLink").value.substring(12,13);
			if(c13=="."){
				finalId=document.getElementById("urlLink").value.substring(16);
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
			   
			   $.ajax({        
		             url:'UpdateLinks.php',        
		             type:'post',                 
		             dataType:'html',           
		             cache: false,            
		             success:data2     
		        }); 
			   
			 
	});
		
		$(TableLinks).click(function(){
			if(document.getElementsByName("TableLinks")){
				//alert(this.getElementByName("button").getAttribute("value"));
				alert($(document.getElementsByName("TableLinks")[0].childNodes[0].toString));
			}
  		
  		});	
  		
  	$('#b_facebook').click(function(){
  		alert("hola");
  		$.ajax({        
	             url:'getIdList.php',        
	             type:'post',                 
	             dataType:'html',  
	             cache: false,            
	             success: function (response) {
						if (response!=-1)
						{
							
							var url="http://www.facebook.com/sharer.php?u=http://gramola.sytes.net/index.html?v="+response+"&t=Compartiendo Lista:"+response;

							nuevaVentana=window.open(url, "segundaPag","toolbar=yes,location=no,resizable=no,height=200" );
						}				   
						else
						{
							
							alert('You can´t generate it. Please select a list');

						}
				 }     
	   });
  	});
  	$('#b_twitter').click(function(){
  		$.ajax({        
					             url:'getIdList.php',        
					             type:'post',                 
					             dataType:'html',  
					             cache: false,            
					             success: function (response) {
										if (response!=-1)
										{
											var response=response.toString();
											var url="https://twitter.com/intent/tweet?text=Compartiendo la lista:"+response+"&url=http://gramola.sytes.net/index.html?v="+response;
											nuevaVentana=window.open(url, "segundaPag","toolbar=yes,location=no,resizable=no,height=500" );
										}				   
										else
										{
											
											alert('You can´t generate it. Please select a list');
				
										}
								 }     
					   });
  		

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
				updateLists();
				}
				
  	}
  	
  	function voteList(){
  			//definir funcion ajax que llame a voteList.php que has de crear, y pasas este idLink como parametro
  			 	var param= 'numVote=' + this.name;
				if (confirm('Do you want to vote for this list?'))
				{
					$.ajax({        
								             url:'votarLista.php',        
								             type:'post',                 
								             dataType:'html',  
								             data:param,          
								             cache: false,            
								             success: function (response) {
													if (response==true)
													{
														 alert('The list has been voted');
														location.reload(true);
													}				   
													else
													{
														alert('The list hasn´t been voted');
							
													}
											 }     
								        }); 
				
				}
				
  	}
  	
  	function setVote(){
  			//definir funcion ajax que llame a setVote.php que has de crear, y pasas este numero como parametro
  				
  				
  			 	var param= "numVote=" + this.name + "&idLink=" + this.title;
					//alert(param);
				
					$.ajax({        
								             url:'setVote.php',        
								             type:'post',                 
								             dataType:'html',  
								             data:param,         
								             cache: false,            
								             success: function (response) {
													if (response==true)
													{
														 alert('The vote has been stablish');
														 
							
													}				   
													else
													{
														alert(response);
													//	alert('The the vote hasn´t been stablish');
							
													}
											 }     
								        }); 
				

  	}

    $(button).click(function(){
	
		if(document.getElementById("user").value.length < 3 && document.getElementById("user1").value.length< 3){
			//alert("Your nick must have at least 3 letters");
	
			//location.reload(true);
					return false;
		}
		else if(document.getElementById("pass").value.length < 3 && document.getElementById("pass1").value.length < 3){
			alert("Your password must have at least 3 letters");
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
   				location.reload(true);

			},
			error: function (response) {
                        alert(response.responseText);
            },
            failure: function (response) {
                alert(response.responseText);
            }
		});
		

   });
   
   
  
    $(login).click(function(){
		$.ajax({
			type:'POST', 
			url: 'mensaje.php', 
			data:$('#login').serialize(),
			success:function(result){
				if(result==1){
					fLogin;
					location.reload(true);
				}
				else{
					alert("usuario no identificado");
					location.reload(true);

				}
			 
		},
		});
		
   });
   
   

   
   function fLogin(response) { 
				$('#DLogin').hide();
				$('#desaparecer').hide();
				$('#LogOut').fadeIn();
				$('#Perfil').fadeIn();
				$('#tabs2').fadeIn();
   				$('#pestanasPrincipales').hide();
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
		            	$(vector[i]).css("background-color","lightgreen");  
//		            	alert(vector[i].onclick);
		            }
                //    $('#lista').listview("refresh");   
      			 };
      			 //esta funcion ajax es distinta, ya que envía un parametro que tu has determinado
		        this.muestraLinks = function muestraLinks(){   
		        	var vector= document.getElementsByClassName('list');
		       
		            for(var i=0;i<vector.length;i++){
		            	$(vector[i]).css("background-color","lightgreen");  
		            	             
		            }
		        	 $(this).css("background-color","green");           
				  	var param= 'id=' + this.name;
				  	
					document.f1.campo1.value="http://gramola.sytes.net/index.html?v="+this.name;
					
				  	//document.getElementById('b_BorrarLista').innerText= "Delete ";
				  	//alert(document.getElementById('b_BorrarLista').innerText);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
				  	playlist.delPlayList();//La borro para que cada vez que pincha en un boton lista, cree una playList nueva, sino se agregaria uno detras de otro
					playlist.setId(this.name);//aqui marco el id de la lista de dodne salen los links de dentro del playList
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7					
				  	$.ajax({        
				             url:'links.php',        
				             type:'post',                 
				             dataType:'html',  
				             data:param,          
				             cache: false,            
				             success:data2
				        }); 
				        
		        };
    		}
		    var objeto2 = new cambiaOnClickListas();  
		    objeto2.cambia(document.getElementById("div-clase2")); 
		    
		}
  		function data2 (html2) {
	            //$html.filter('.list').appendTo("#nameList");
	            //$('#Links').find('#nameLinks').html(html);
	            function cambiaOnClickLinks(){
	            	this.change=function change(where){
	            		
	            		where.innerHTML="";
	            		$('#TableLinks').append(html2);
	            		//$( "#TableLinks" ).table( "refresh" );
	            	//	document.getElementById ("TableLinks").refresh();
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
			            	//vector[i].onclick = reproductor;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
			            	playlist.addSong(new Song(vector[i].name));
			            	//añado todas las canciones una a una en la playList, se encarga el propio metodo por dentro de añadirle a cada cancion el id de la lista a la que pertenece
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
			           }
			           //alert(playList.getNumberSongs());			            
			            var vector3=document.getElementsByClassName('buttonDelLink');
			            for(var i=0;i<vector3.length;i++){
			                  	vector3[i].onclick = deleteLink;
			            }
			            
			              var vectorList=document.getElementsByClassName('buttonBList');
			            for(var i=0;i<vectorList.length;i++){
			                  	vectorList[i].onclick = deleteList;
			            }
			            
			             var vectorVList=document.getElementsByClassName('buttonVList');
			            for(var i=0;i<vectorVList.length;i++){
			                  	vectorVList[i].onclick = voteList;
			            }
			            
			             var vectorVotes=document.getElementsByClassName('buttonOfVotes');
			            for(var i=0;i<vectorVotes.length;i++){
			                  	vectorVotes[i].onclick = setVote;
			             

			            }
			            
			            
			            
			            var vector2= document.getElementsByClassName('linkIcon');
			            //alert(vector2.length);
			           //$('#providerTabla').text("adios");
			          
			            for(var j=0;j<vector2.length;j++){
			            	//alert(vector2[j].innerText);
			            	if(vector2[j].innerText=='youtube'){
			            		vector2[j].innerHTML= '<image style="width=60px height=60" src="./images/youtube.png">';
			            		(playlist.getElement(j)).setProvider( PROVIDER.YOUTUBE);
			            	}
			            	if(vector2[j].innerText=='goear'){
			            		vector2[j].innerHTML= '<image style="width=60px height=60px" src="./images/goear.png">';
			            		playlist.getElement(j).setProvider(PROVIDER.GOEAR);
			            	}
			            	if(vector2[j].innerText=='spotify'){
			            		vector2[j].innerHTML= '<image style="width=50px height=50px" src="./images/spotify.png">';
			            		playlist.getElement(j).setProvider("spotify");
			            	}
			            	if(vector2[j].innerText=='mp3'){
			            		vector2[j].innerHTML= '<image style="width=50px height=40px" src="./images/music.png">';
			            		playlist.getElement(j).setProvider(PROVIDER.MP3);
			            	}
			            	
			            }
	            	
			            //aqui toca hacer lo mismo que ahora pero buscando la clase de la x y recorriendolo añadiendole
			            //una funcion que borre el link
			            
			            $('#div_BorrarLista').fadeIn();
			            $('#div_VoteList').fadeIn();
			            $("#TableLinks").tablesorter();
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

 });