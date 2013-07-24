<?php

header("Content-Type: text/html;charset=utf-8");
if( !empty($_POST['changeEmail'])  && !empty($_POST['chEmailPass'])){
	include "conexion.php";	
	session_start();
	
	

$nickpass=$_SESSION["nick"];
$newemail=$_POST["changeEmail"];
$actualpassemail=$_POST["chEmailPass"];


$consulta="SELECT idUser FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	
$consulta1="SELECT pwd FROM users where nick=\"$nickpass\"";
$result1=mysqli_query($conexion,$consulta1) ;
			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result1) ) {
				
	        	if ($actualpassemail == $row[0]){
	        			
						mysqli_query($conexion,"UPDATE users SET email=\"$newemail\" WHERE nick=\"$nickpass\"");
						echo "Disfruta de tu nuevo email $newemail!";
	        		
					
	        	}
				 else{
	                echo " Incorrecto, $actualpassemail no es $row[0] ";
	            }
				
				}
			}
			else {
		echo "<p>No se pudo efectuar el cambio</p>\n";
		echo "o encontrado o mas de uno";
 		exit();
	}

include "close_conexion.php";
}
else{
	echo "Error en los datos\n";
	
	
}
?>

