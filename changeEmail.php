<?php

header("Content-Type: text/html;charset=utf-8");
if(!empty($_POST['email']) && !empty($_POST['newemail']) && !empty($_POST['confnewemail']) && !empty($_POST['actualpassemail'])){
	include "conexion.php";	
	session_start();

$nickpass=$_SESSION["nick"];
$newemail=$_POST["newemail"];
$email=$_POST["email"];
$confnewemail=$_POST["confnewemail"];
$actualpassemail=$_POST["actualpassemail"];


$consulta="SELECT idUser FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	
$consulta1="SELECT email FROM users where nick=\"$nickpass\"";
$result1=mysqli_query($conexion,$consulta1) ;
			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result1) ) {
				
	        	if ($email == $row[0]){
	        		if ($_POST['newemail'] == $_POST['confnewemail']){
	        			
						mysqli_query($conexion,"UPDATE users SET email=\"$newemail\" WHERE nick=\"$nickpass\"");
						echo "Disfruta de tu nuevo email $newemail!";
	        		}
					 else{
	                    echo '¡Los emails no coinciden';
	                }
					
	        	}
				 else{
	                echo " Incorrecto, $actualpass no es $row[0] ";
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
	echo $_POST['newemail'];
	echo $_POST['email'];
	
}
?>

