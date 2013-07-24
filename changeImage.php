<?php

header("Content-Type: text/html;charset=utf-8");
if(!empty($_POST['imageLink'])){
	include "conexion.php";	
	session_start();

$nickpass=$_SESSION["nick"];
$imageLink=$_POST["imageLink"];


$consulta="SELECT idUser FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	

			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result) ) {
				
	        			
						mysqli_query($conexion,"UPDATE users SET imgPerfil=\"$imageLink\" WHERE nick=\"$nickpass\"");
						echo "Enjoy your new Image";
	        							 			
				}
			}
			else {
		echo "<p>We couldn´t make the change</p>\n";
		echo "Not found or more than one";
 		exit();
	}

include "close_conexion.php";
}
else{
	echo "Error in the data\n";

}
?>

