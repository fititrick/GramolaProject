<?php

if(!empty($_POST['select-choice-share']))
{
	include "conexion.php";	
	session_start();
	
	$list=$_POST["select-choice-share"];
	$nick=$_SESSION["idUser"];
	
	$consulta="SELECT idList FROM lists where name=\"$list\" AND idUser=\"$nick\"";
	$result=mysqli_query($conexion,$consulta);
	$row = mysqli_fetch_row($result);
	echo $row[0];
}



?>