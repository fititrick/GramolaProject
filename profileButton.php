<?php
header("Content-Type: text/html;charset=utf-8");
include "conexion.php";	
session_start(); 
$nickpass=$_SESSION["nick"];

	$consulta ="SELECT imgPerfil FROM users where nick=\"$nickpass\" ";	
	$result=mysqli_query($conexion, $consulta) ;
	if (mysqli_num_rows($result)==1){
		while( $row = mysqli_fetch_row($result) ){
			echo "<button id='Perfil5' ' data-theme='e' href='#'  ><img src='$row[0]'  border='3'  height='20' width='20' /> 
						Welcome $nickpass
					</button>";
		}
	}
	
	/*<button id="Perfil1" type="submit" data-theme="e" >					<input type="image" border="3" style color="#000000" src="http://imgs.tuts.dragoart.com/how-to-draw-pokemon_1_000000011348_5.jpg" width="35"  name="image"> 

						Welcome
					</button>*/


?>