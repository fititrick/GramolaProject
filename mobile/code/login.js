$(document).ready(function(){
	
    $("#errorMsg").hide();
   
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
    
    $("#newLinkButton").click(function(){
    	$.ajax({
			   		type:'POST',
			   		url: 'newLink0.php',
			   		success: function(response) {	
			   			$('#select-choice-2').append(response);	
    
        
        			}		
    	});
    });
    
    var flag=0;
    
    $("#deleteListButton").click(function(){
    	if(flag==0){
    	$.ajax({
			   		type:'POST',
			   		url: 'deleteList0.php',
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
			   		success: function(response) {
			   			flag=0;	
			   			$.mobile.changePage("#home");
    				    muestraListas();

    
        
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
    
    
    
    $(".shareLinkButton").click(function(){
      	$.ajax({
			   		type:'POST',
			   		url: 'shareList0.php',
			   		success: function(response) {	
			   			$('#select-choice-share').append(response);	
    					
           			}		
    	});
    	
    	
    	
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