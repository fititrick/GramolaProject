<?php

header("Content-Type: text/html;charset=utf-8");
if( !empty($_POST['actualpass']) && !empty($_POST['newpass']) && !empty($_POST['confnewpass'])){
	include "conexion.php";	
	session_start();

$nickpass=$_SESSION["nick"];
$actualpass=$_POST["actualpass"];
$newpass=$_POST["newpass"];
$confnewpass=$_POST["confnewpass"];

$consulta="SELECT idUser FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	
$consulta1="SELECT pwd FROM users where nick=\"$nickpass\"";
$result1=mysqli_query($conexion,$consulta1) ;	
			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result1) ) {
				
	        	if ($actualpass == $row[0]){
	        		if ($_POST['newpass'] == $_POST['confnewpass']){
	        			
						mysqli_query($conexion,"UPDATE users SET pwd=\"$newpass\" WHERE nick=\"$nickpass\"");
						echo '¡Tu Password a sido cambiada con éxito!' ;
						
	        		}
					 else{
	                    echo '¡Las contraseñas no coinciden';
	                }
					
	        	}
				 else{
	                echo " Incorrecta, $actualpass no es $row[0] ";
	            }
				
				}
			}
			else {
		echo "<p>No se pudo efectuar el cambio</p>\n";
		echo "no encontrado o mas de uno";
 		exit();
	}

include "close_conexion.php";
}
else{
	echo "Error en los datos\n";

}
?>

