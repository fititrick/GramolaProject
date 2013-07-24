<?php

header("Content-Type: text/html;charset=utf-8");
if(!empty($_POST['changeAvatar'])){
	include "conexion.php";	
	session_start();

$nickpass=$_SESSION["nick"];
$imageLink=$_POST["changeAvatar"];


$consulta="SELECT idUser FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	

			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result) ) {
				
	        			
						mysqli_query($conexion,"UPDATE users SET imgPerfil=\"$imageLink\" WHERE nick=\"$nickpass\"");
						echo "Disfruta de tu nueva imagen";
	        							 			
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

