<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$nameList=$_POST["select-choice-3"];
	$idUser=$_SESSION["idUser"];
	
	$consulta ="SELECT  idList FROM lists where name=\"$nameList\" and idUser=\"$idUser\"";	
	$result=mysqli_query($conexion, $consulta) ;	
	$row = mysqli_fetch_row($result);
	
	$resultado = mysqli_query($conexion,"DELETE FROM lists WHERE idList='$row[0]'");
		echo true;
}
else
{
	echo false;
}