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
    
    
    
     
    
    
    
    
    
    
    });