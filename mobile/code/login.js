$(document).ready(function(){
	
    $("#errorMsg").hide();
    $('#SaveSharedList').hide();
    
    
    if (start == true) {
		//if(idListaCompartida!="http://localhost/GramolaProject/" && idListaCompartida!="http://localhost/GramolaProject/index.html" &&  idListaCompartida!="http://gramola.sytes.net/GramolaProject/" && idListaCompartida!="http://gramola.sytes.net/GramolaProject/index.html" && idListaCompartida!="http://gramola.sytes.net/" ){  //esto es lo que hago si me llega una lista compartida.

		//if(leerGet()!=null){
		window.location = ("#home");

		//$('#contenedor').hide();
		//  $('#p_links').fadeIn();
		//$("#tabsShare").tabs();

		//Primero mirar a ver si estoy logueado, si nolo estoy, mostrar solo tabla con links
		$.ajax({
			type : 'POST',
			url : 'sesionIniciada.php',
			success : function(response) {
				if (response == true) {//si hay sesion
					$.ajax({
						type : 'POST',
						url : 'getUser.php',
						success : function(response2) {
							//fLogin("Session started by " + response2);
							/*$.ajax({
								type : 'POST',
								url : 'profileButton.php',
								success : function(response) {
									$('#PerfilShare').html(response);

									document.getElementById('Perfil5').onclick = mainProfile;
									document.getElementById('Perfil5').className = 'button';

								}
							});*/
						}
					});
					//$('#LogInShare').hide();
					$('#SaveSharedList').fadeIn();
					//$('#SaveSharedList').collapsible({refresh:true});
				} else {//si no hay sesion, deberian de desaparecer el boton de logout
					$('#SaveSharedList').hide();
					$('#deleteLinkButton').hide();
					$('#deleteListButton').hide();
					$('#newLinkButton').hide();
					$('#newListButton').hide();
					$('#btnProfile').hide();
					$('#LogInShare').html("<p><a href='#login' class='button' data-role='button'  data-transition='pop'><font color='black'>Log in</font></a></p>");
				}
			}
		});
		//si estoy logueado SaveSharedList aparecera, sino solo la de compartir
		var param = 'id=' + idListaCompartida;
		document.f2.campo1.value = "http://gramola.sytes.net/index.html?v=" + idListaCompartida;
		//document.getElementById('b_BorrarLista').innerText= "Delete ";
		//alert(document.getElementById('b_BorrarLista').innerText);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
		//playlist.delPlayList();//La borro para que cada vez que pincha en un boton lista, cree una playList nueva, sino se agregaria uno detras de otro
		//playlist.setId(idListaCompartida);//aqui marco el id de la lista de dodne salen los links de dentro del playList
		playlist = new Playlist(idListaCompartida);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
		$.ajax({
			url : 'linksWithoutConexion.php',
			type : 'post',
			dataType : 'html',
			data : param,
			cache : false,
			success : linksShare
		});
		$('#b_facebook').click(function() {

			var url = "http://www.facebook.com/sharer.php?u=http://gramola.sytes.net/index.html?v=" + idListaCompartida + "&t=Compartiendo Lista:" + idListaCompartida;
			nuevaVentana = window.open(url, "segundaPag", "toolbar=yes,location=no,resizable=no,height=200");

		});
		$('#b_twitter').click(function() {
			var dir = "http://gramola.sytes.net/index.html?v=" + idListaCompartida;
			var dir2 = encodeURIComponent(dir);
			var tit = "Shared the list nº " + idListaCompartida + " of Gramola ";
			var tit2 = encodeURIComponent(tit);

			var url = 'http://twitter.com/?status=' + tit2 + '%20' + dir2 + ''
			nuevaVentana = window.open(url, "segundaPag", "toolbar=yes,location=no,resizable=no,height=500");
		});

		function linksShare(links) {
			//    $('#lista').fieldcontain("refresh");
			//$html.filter('.list').appendTo("#nameList");
			//$('#Links').find('#nameLinks').html(html);

			function cambiaOnClickLinks() {
				this.change = function change(where) {
					where.innerHTML = "";
					$('#lists').append(links);
					//$('#Links').find('#nameLinks').html(html2);
					//aqui lo que hago es buscar en la pagina index.html todos los elementos que hay con la clase=link
					//vector almancena en cada casilla uno de esos elementos
					//modifico su onclick para que llamen a la funcion reproductor
					//vector.length te marca cuantas canciones hay
					//y lo mas importate es que cada cancion tiene un posList (una posicion en la lista de reproductio)
					//lo que entiendo yo es que si reproduces la 4, la siguiente sea la 5....
					//ahora ve a funcion reproductor

					var vector = document.getElementsByClassName('linkshared');

					for (var i = 0; i < vector.length; i++) {
						//vector[i].onclick = reproductorShared;

						playlist.addSong(new Song(vector[i].name, null));
						//alert(i);
						//añado todas las canciones una a una en la playList, se encarga el propio metodo por dentro de añadirle a cada cancion el id de la lista a la que pertenece
					}
					var vector2 = document.getElementsByClassName('linkIconshared');
					//alert(vector2.length);
					//$('#providerTabla').text("adios");

					for (var j = 0; j < vector2.length; j++) {
						//alert(vector2[j].innerText);
						if (vector2[j].innerText == 'youtube') {
							vector2[j].innerHTML = '<image style="width=60px height=60" src="./images/youtube.png">';
							(playlist.getElement(j)).setProvider(PROVIDER.YOUTUBE);
						}
						if (vector2[j].innerText == 'goear') {
							vector2[j].innerHTML = '<image style="width=60px height=60px" src="./images/goear.png">';
							playlist.getElement(j).setProvider(PROVIDER.GOEAR);
						}
						if (vector2[j].innerText == 'mp3') {
							vector2[j].innerHTML = '<image style="width=50px height=40px" src="./images/music.png">';
							playlist.getElement(j).setProvider(PROVIDER.MP3);
						}

					}

					//aqui toca hacer lo mismo que ahora pero buscando la clase de la x y recorriendolo añadiendole
					//una funcion que borre el link

					$("#TableLinksShare").tablesorter();
				};

			}

			var objetoLinks = new cambiaOnClickLinks();
			objetoLinks.change(document.getElementById("LinksShare"));

		}

	}/* else {//si me llega una lista sin compartir
		$('#LogOut').hide();
		$('#tabs2').hide();
		$('#div_BorrarLista').hide();
		$('#div_VoteList').hide();
		// $('#contenedor').fadeIn();
		// $('#p_links').hide();

		$.ajax({
			type : 'POST',
			url : 'sesionIniciada.php',
			success : function(response) {
				if (response == true) {
					$.ajax({
						type : 'POST',
						url : 'getUser.php',
						success : function(response2) {
							fLogin("Session started by " + response2);
							$.ajax({
								type : 'POST',
								url : 'profileButton.php',
								success : function(response) {
									$('#Perfil').html(response);

									document.getElementById('Perfil5').onclick = mainProfile;
									$('#Perfil5').css("background-color", "lightgreen");

								}
							});
						}
					});
				}
			}
		});

	}
    
    
    
  */  
    
    
    
    
    
    
    
    
    
    
    
   
    $("#btnLogin").click(function(){
    	
        var usu = $("#txtuser").val();
        var pass = $("#txtpassword").val();
               
        $.post("login.php",{ user : usu, pass : pass},function(respuesta){
            if (respuesta == true) {
                $.mobile.changePage("#home");
             
                muestraListas();
             
            }
            else{
            	
                $.mobile.changePage('#pageError', 'pop', true, true);
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
            }
        });
    });
    
    
    $("#btnReg").click(function(){
    	
        var usu = $("#userReg").val();
        var pass = $("#passReg").val();
        var passConf = $("#passRegConf").val();
        var email = $("#email").val();
        
        $.post("register.php",{ user : usu, pass : pass, passConf : passConf , email : email},function(respuesta){
            if (respuesta == true) {
                $.mobile.changePage("#home");
                muestraListas();
            }
            else{
            
                $.mobile.changePage('#pageError', 'pop', true, true);
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
            }
        });
    });
    
    $("#btnProfile").click(function(){
    
        $.post("Perfil.php",{},function(respuesta){
        	
        	var profileData = $('#profileData');
			profileData.html(respuesta);
           
        });
    });
    
     $("#btnChangeNick").click(function(){
    
        $.ajax({
			type:'POST', 
			url: 'changeNick.php', 
			data:$('#form_accSettingsNick').serialize(),
			cache: false,
			success: function(response) { 
				//alert(response); 	
   					document.getElementById("changeNick").value="";
		   			document.getElementById("changeNickPass").value="";
		   			$.mobile.changePage("#home");
	   				

			},
			error: function (response) {
                        $.mobile.changePage('#pageError', 'pop', true, true);
            }
		});
    });
    
    $("#btnChangePass").click(function(){
    
        $.ajax({
			type:'POST', 
			url: 'changePass.php', 
			data:$('#form_accSettingsPass').serialize(),
			cache: false,
			success: function(response) { 
				alert(response); 	
   					document.getElementById("changePass").value="";
		   			document.getElementById("chNewPass").value="";
		   			document.getElementById("chNewPassConf").value="";
		   		//	$.mobile.changePage("#home");
	   				

			},
			error: function (response) {
                        $.mobile.changePage('#pageError', 'pop', true, true);
            }
		});
    });
    
    $("#btnChangeEmail").click(function(){
    
        $.ajax({
			type:'POST', 
			url: 'changeEmail.php', 
			data:$('#form_accSettingsEmail').serialize(),
			cache: false,
			success: function(response) { 
				alert(response); 	
   					document.getElementById("changeEmail").value="";
		   			document.getElementById("chEmailPass").value="";
		   		//	$.mobile.changePage("#home");
	   				

			},
			error: function (response) {
                        $.mobile.changePage('#pageError', 'pop', true, true);
            }
		});
    });
    
    $("#btnChangeAvatar").click(function(){
    
        $.ajax({
			type:'POST', 
			url: 'changeImage.php', 
			data:$('#form_accSettingsAvatar').serialize(),
			cache: false,
			success: function(response) { 
				alert(response); 	
   					document.getElementById("changeAvatar").value="";
		   		//	$.mobile.changePage("#home");
	   				

			},
			error: function (response) {
                        $.mobile.changePage('#pageError', 'pop', true, true);
            }
		});
    });
    
   
    
  
    
    $("#btnNewList").click(function(){
    	
        var nameList = $("#nameList").val();
    
        
        $.post("newlist.php",{ nameList : nameList},function(respuesta){
        //	alert(respuesta);
            if (respuesta == true) {
            	//alert("vamos bien");
            	document.getElementById("nameList").value="";
                $.mobile.changePage("#home");
                muestraListas();
            }
            else{
            	document.getElementById("nameList").value="";
                $.mobile.changePage('#pageErNewList', 'pop', true, true);
                
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
           }
        });
    });
    
    var flagLink=0;
    
    $("#newLinkButton").click(function(){
    	if(flagLink==0){
    	$.ajax({
			   		type:'POST',
			   		url: 'newLink0.php',
			   		cache:false,
			   		success: function(response) {	
			   			$('#select-choice-2').append(response);	
    						flagLink=1;
        
        			}		
    	});
    	}
    });
    
    var flag=0;
    
    $("#deleteListButton").click(function(){
    	if(flag==0){
    	$.ajax({
			   		type:'POST',
			   		url: 'deleteList0.php',
			   		cache:false,
			   		success: function(response) {	
			   			$('#select-choice-3').append(response);	
        				flag=1;
        			}		
    	});
    	}
    });
    
    $("#btnDeleteList").click(function(){
    	
    	
		if (confirm('Do you want remove this list?'))
				{
    	$.ajax({
			   		type:'POST',
			   		data:$('#form_DeleteList').serialize(),
			   		url: 'deleteList.php',
			   		cache:false,
			   		success: function(response) {
			   			$("#select-choice-3").find("option[class='deleteLinkS']").remove();
			   			$.mobile.changePage("#home");
    				    muestraListas();
						flag=0;
    
        
        			},
        			error:function(response)	{	
			   			$.mobile.changePage("#home");
    				    muestraListas();
    
        
        			}	
    	});
    }
    });
    
    $("#deleteLinkButton").click(function(){
    	
    	muestraLinkDel();
    	
       });
    
    
    $("#chao").click(function(){
    	
    	$.ajax({
			   		type:'POST',
			   		url: 'logOut.php',
			   		success: function(response) {
				   		$.mobile.changePage("#login");	
	    				document.getElementById("txtuser").value="";
			   			document.getElementById("txtpassword").value="";
        
        			}	
    	});
    	
    	   	
       });
       var flagShare=0;
    
    $("#btnshare").click(function(){
      	if(flagShare==0){
      	$.ajax({
			   		type:'POST',
			   		url: 'shareList0.php',
			   		success: function(response) {	
			   			$('#select-choice-share').append(response);	
			   			
    					flagShare=1;
           			}		
    	});
    	
    	}
    	
    });

    $("#btngoBack").click(function(){
    	
    	$.mobile.changePage("#home");
 		muestraListas();
    	
       });
    
    
    $("#b_facebook").click(function()
    {
    	 $.ajax({
			type:'POST', 
			url: 'numList.php', 
			data:$('#select-choice-share').serialize(),
			cache: false,
			success: function(response) { 
				$("#select-choice-share").find("option[class='shareListS']").remove();
					flagShare=0;
	   				var url="http://www.facebook.com/sharer.php?u=http://gramola.sytes.net/index.html?v="+response+"&t=Compartiendo Lista:"+response;
					nuevaVentana=window.open(url, "segundaPag","toolbar=yes,location=no,resizable=no,height=200");
    	    	
				}
    	});
       	    	
    });
    
      $("#b_twitter").click(function(){
      	
      	$.ajax({
			type:'POST', 
			url: 'numList.php', 
			data:$('#select-choice-share').serialize(),
			cache: false,
			success: function(response) { 
				$("#select-choice-share").find("option[class='shareListS']").remove();
					flagShare=0;
	   				var dir = "http://gramola.sytes.net/index.html?v="+response;
					var dir2 = encodeURIComponent(dir);
					var tit = "Shared the list nº "+response+ " of Gramola ";
					var tit2 = encodeURIComponent(tit);

		var url='http://twitter.com/?status='+tit2+'%20'+dir2+''
		nuevaVentana=window.open(url, "segundaPag","toolbar=yes,location=no,resizable=no,height=500" );
    	    	
				}
    	});
    	
    	
   	});
    	
    
    $("#btnLists").click(function(){
    	$.mobile.changePage("#home");
        muestraListas();
    });
    
     $("#btnNewLink").click(function(){
    	
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
			   		cache:false,
			   		success: function(res) {
			   			//alert(res);		   				
		   				if(!res){
		   					confirm('A failure occurred inserting new link');
		   				}
		 //tras lanzar el mensaje de link insertado, borra todo lo escrito en el formulario sustituyéndolo por "".
		   				document.getElementById("urlLink").value="";
		   				document.getElementById("number-pattern").value="";
		   				document.getElementById("singerLink").value="";	
		   				document.getElementById("songNameLink").value="";
		   				$("#select-choice-2").find("option[class='newLinkS']").remove();	
		   				flagLink=0;		
				   		$.mobile.changePage("#home");
                		muestraListas();		
					}
						   				
					});		   
  
    });
    
    function  muestraLinkDel(){
    	$.post("listsDelLinks.php",{ },function(respuesta){
                					
						var listsLinks = $('#linksDel');
						//alert(lists);
						listsLinks.html(respuesta);
						listsLinks.find('div[data-role=collapsible]').collapsible({theme:'a',refresh:true});						
						
						var elementsArray = document.getElementsByClassName("listaDelLinks");
						var ides=new Array();
						var x;
						for( x=0;x<elementsArray.length;x++){
							ides[x]=elementsArray[x].id;
					
						var idesTxt=ides.join();
						
								idList='idList=' + ides[x];
						
								$.ajax({
									type:'POST', 
									url: 'linksDel.php', 
									data:idList,
									success: function(response){
									
										var arrayLinks=response.split("*");
										var idListas=arrayLinks[0];
										//alert(arrayLinks[0]);
										for(var z=0;z<arrayLinks.length;z++){
											arrayLinks[z]=arrayLinks[z+1];
										}
										var arrayLinks3=arrayLinks.join(" ");
						
										var ul = document.getElementsByClassName('listaDelLinks');
										
										for(var h=0;h<ul.length;h++){
									
										if((ul[h].id-idListas)==0){
											$(ul[h]).append(arrayLinks3);
											var vector=document.getElementsByClassName('delink');
											//alert(vector[0].className); 
										for(var d=0;d<vector.length;d++){  
											//alert(vector[d].className);
																		
										}
											
											listsLinks.find(ul[h]).listview({theme:'b',refresh:true});
																					
										}
										}
																	           
									}
									
									
									
								});
								
								
								
							}
	
						});
    }
    
    function  muestraListas(){
    	 $.post("lists.php",{ },function(respuesta){
                					
						var lists = $('#lists');
						//alert(lists);
						lists.html(respuesta);
						lists.find('div[data-role=collapsible]').collapsible({theme:'a',refresh:true});						
						
						var elementsArray = document.getElementsByClassName("lista");
						var ides=new Array();
						var x;
						for( x=0;x<elementsArray.length;x++){
							ides[x]=elementsArray[x].id;
					
						var idesTxt=ides.join();
						
								idList='idList=' + ides[x];
						
								$.ajax({
									type:'POST', 
									url: 'links.php', 
									data:idList,
									success: function(response){
									
										var arrayLinks=response.split("*");
										var idListas=arrayLinks[0];
								
										for(var z=0;z<arrayLinks.length;z++){
											arrayLinks[z]=arrayLinks[z+1];
										}
										var arrayLinks2=arrayLinks.join(" ");
						
										var ul = document.getElementsByClassName('lista');
										
										for(var h=0;h<ul.length;h++){
									
										if((ul[h].id-idListas)==0){
											$(ul[h]).append(arrayLinks2);
											lists.find(ul[h]).listview({theme:'b',refresh:true});
											
										}
										}
									
							           
									}
									
								});
								
							}
	
						});
    }
     
    
    
    
    
    
    
    });