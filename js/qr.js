$(document).ready(function(){
 
				$('.lightbox').click(function(){
					$.ajax({        
					             url:'getIdList.php',        
					             type:'post',                 
					             dataType:'html',  
					             cache: false,            
					             success: function (response) {
										if (response!=-1)
										{
											//alert(response);
											qrGen(response);
											$('.backdrop, .box').animate({'opacity':'.50'}, 300, 'linear');
											$('.box').animate({'opacity':'1.00'}, 300, 'linear');
											$('.backdrop, .box').css('display', 'block');
										}				   
										else
										{
											
											alert('You can´t generate it');
				
										}
								 }     
					   }); 					
				});
 
				$('.close').click(function(){
					close_box();
				});
 
				$('.backdrop').click(function(){
					close_box();
				});
 
			});
 
			function close_box()
			{
				$('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
					$('.backdrop, .box').css('display', 'none');
				});
			}
			
			function qrGen(idLista){
				//alert("idLista="+idLista);
				$('#miCanvas').qrcode({
					text	: "http://gramola.sytes.net/index2.html?v="+idLista,
					render	: "canvas",  // 'canvas' or 'table'. Default value is 'canvas'
					background : "#ffffff",
					foreground : "#000000",
					width : 150,
					height: 150
				});
				
			}
		
	