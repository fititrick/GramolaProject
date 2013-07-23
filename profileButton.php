<?php
header("Content-Type: text/html;charset=utf-8");
include "conexion.php";	
session_start(); 
$nickpass=$_SESSION["nick"];

	

	$consulta ="SELECT imgPerfil FROM users where nick=\"$nickpass\" ";	
	$result=mysqli_query($conexion, $consulta) ;
	if (mysqli_num_rows($result)==1){
		while( $row = mysqli_fetch_row($result) ){
			
			echo "<p><a id='Perfil5' href='#profile-Page' data-role='button' ><img align='Absbottom' src='$row[0]'  border='2'  height='23' width='23' ><font color='black'>Welcome $nickpass</font></a></p>";
		}
	}
	
	

	include "close_conexion.php";

?>