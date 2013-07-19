<?php
header("Content-Type: text/html;charset=utf-8");
if(!empty($_POST['urlLink']) && !empty($_POST['select-choice-1']) && !empty($_POST['position']) && !empty($_POST['singer']) && !empty($_POST['songName'])){
	include "conexion.php";	
	session_start();
	$nameList=$_SESSION["NList"];
	$songName=$_POST['songName'];
	$position=$_POST['position'];
	$singer=$_POST['singer'];
	$url=$_POST['urlLink'];
	$choice=$_POST['select-choice-1'];
	try {
			 	 $resultado = mysqli_query($conexion,"INSERT INTO links (name, posList, artist, link, provider, idList) values ('".$songName."','".$position."','".$singer."','".$url."','".$choice."','".$nameList."') ");
				 if (! $resultado){
				 		echo "<p>No se pudo efectuar, error en los datos\n";
					}
				 else{
				    echo "<p>Link inserted</p>\n";
	
				  } 	
	    } catch (ErrorException $e) {
	        // este bloque no se ejecuta, no coincide el tipo de excepción
	   
	    } catch (Exception $e) {
	        // este bloque captura la excepción
	
	    }

	include "close_conexion.php";
}
else{
	echo "Error en los datos\n";
	echo $_POST['songName'];
	echo $_POST['position'];
	echo $_POST['singer'];
	echo $_POST['urlLink'];
	echo $_POST['select-choice-1'];
}
?>