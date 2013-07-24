<?php

/*Problemas con el cambio de Nick: Si cambiamos una contraseña o un email, no hay problema, sepuede cambiar cuantas veces queramos.
 * En cambio, una vez que cambiamos el nick, al obtenerlo de la sesión, ese nick queda permanente hasta que actualicemos la sesión,
 * lo que provoca que no encuentre en la bd lo que esta buscando.
 * Solución: añadir el campo nick, y que se inserte manualmente*/

header("Content-Type: text/html;charset=utf-8");
if( !empty($_POST['changeNickPass']) && !empty($_POST['changeNick']) ){
	include "conexion.php";	
	session_start();
	

$nick=$_SESSION["nick"];
$newnick=$_POST["changeNick"];
$confpass=$_POST["changeNickPass"];




$consulta="SELECT idUser FROM users where nick=\"$nick\"";
$result=mysqli_query($conexion,$consulta) ;	
$consulta1="SELECT pwd FROM users where nick=\"$nick\"";
$result1=mysqli_query($conexion,$consulta1) ;
			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result1) ) {
				
	        	if ($confpass == $row[0]){
	        			
						mysqli_query($conexion,"UPDATE users SET nick=\"$newnick\" WHERE nick=\"$nick\"");
						echo "Disfruta de tu nuevo nick $newnick!";
						$_SESSION["nick"]=$newnick;
	        		
					
	        	}
				 else{
	                echo " Incorrecta, $confpass no es $row[0] ";
	            }
				
				}
			}
			else {
		echo "<p>No se pudo efectuar el cambio</p>\n";
		echo "o encontrado o mas de uno";
 		exit();
	}

}
else{
	echo "Error en los datos\n";
	
	
}
?>

