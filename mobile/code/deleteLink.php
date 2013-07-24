<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$NLink=$_POST['idLinkBorrar'];
	
	
			
		
		$resultado = mysqli_query($con,"DELETE FROM links WHERE idLink='$NLink'");
		if(!$resultado){
			echo $NLink;
		}else{
		echo "$resultado, $NLink";	
		}
			
		
		
}
else
{
	echo false;
}
?>