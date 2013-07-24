<?php
header("Content-Type: text/html;charset=utf-8");
if(!empty($_POST['urlLink']) && !empty($_POST['select-choice-1']) ){
	include "conexion.php";	
	session_start();
	$nameList=$_SESSION["NList"];
	if(!empty($_POST['songName']))
		$songName=$_POST['songName'];
	else {
		$songName="";
	}
	if(!empty($_POST['position']))
		$position=$_POST['position'];
	else{
		//mirar la ultima posicion de la lista
		$consulta ="SELECT MAX(posList) FROM links where idList=\"$nameList\"";
		$result=mysqli_query($conexion, $consulta) ;
		$row = mysqli_fetch_row($result);
		$position=($row[0]+1);
	}
	if(!empty($_POST['singer']))
		$singer=$_POST['singer'];
	else {
		$singer="";
	}
	$url=$_POST['urlLink'];
	$choice=$_POST['select-choice-1'];
	try {
			 	 $resultado = mysqli_query($conexion,"INSERT INTO links (name, posList, artist, link, provider, idList) values ('".$songName."','".$position."','".$singer."','".$url."','".$choice."','".$nameList."') ");
				 if (!$resultado){
				 		echo false;
					}
				 else{
				 	//$_SESSION["N_linksEnLista"]++;
				    echo true;
	
				  } 	
	    } catch (ErrorException $e) {
	        // este bloque no se ejecuta, no coincide el tipo de excepción
	   
	    } catch (Exception $e) {
	        // este bloque captura la excepción
	
	    }

	include "close_conexion.php";
}
else{
	echo false;
	
}
?>