<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$NLink=$_SESSION["NList"];

		$resultado = mysqli_query($conexion,"DELETE FROM lists WHERE idList='$NLink'");
		echo true;
}
else
{
	echo false;
}
?>