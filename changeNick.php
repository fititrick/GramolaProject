<?php

/*Problemas con el cambio de Nick: Si cambiamos una contraseña o un email, no hay problema, sepuede cambiar cuantas veces queramos.
 * En cambio, una vez que cambiamos el nick, al obtenerlo de la sesión, ese nick queda permanente hasta que actualicemos la sesión,
 * lo que provoca que no encuentre en la bd lo que esta buscando.
 * Solución: añadir el campo nick, y que se inserte manualmente*/

header("Content-Type: text/html;charset=utf-8");
if( !empty($_POST['newnickpass']) && !empty($_POST['confnewnick']) && !empty($_POST['actualpassnick'])){
	include "conexion.php";	
	session_start();

$nickpass=$_SESSION["nick"];
$newnickpass=$_POST["newnickpass"];
$actualpass=$_POST["actualpassnick"];
$confnewnick=$_POST["confnewnick"];

$consulta="SELECT idUser FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	
$consulta1="SELECT pwd FROM users where nick=\"$nickpass\"";
$result1=mysqli_query($conexion,$consulta1) ;
			
			if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result1) ) {
				
	        	if ($actualpass == $row[0]){
	        		if ($_POST['newnickpass'] == $_POST['confnewnick']){
	        			
						mysqli_query($conexion,"UPDATE users SET nick=\"$newnickpass\" WHERE nick=\"$nickpass\"");
						echo "Disfruta de tu nuevo nick $newnickpass!";
	        		}
					 else{
	                    echo '¡Los nicks no coinciden';
	                }
					
	        	}
				 else{
	                echo " Incorrecta, $actualpass no es $row[0] ";
	            }
				
				}
			}
			else {
		echo "<p>No se pudo efectuar el cambio</p>\n";
		echo "o encontrado o mas de uno";
 		exit();
	}
$_SESSION["nick"]=$newnickpass;
}
else{
	echo "Error en los datos\n";
	echo $_POST['newnickpass'];
	
}
?>

