<?php
header("Content-Type: text/html;charset=utf-8");
if(!empty($_POST['urlLink']) && !empty($_POST['select-choice-1']) && !empty($_POST['select-choice-2'])){
	include "conexion.php";	
	session_start();
	$nameList=$_POST["select-choice-2"];
	
		$consultaIdList ="SELECT idList FROM lists where name=\"$nameList\"";
		$resultIdList=mysqli_query($conexion, $consultaIdList) ;
		$rowIdList = mysqli_fetch_row($resultIdList);
	
	if(!empty($_POST['songName']))
		$songName=$_POST['songName'];
	else {
		$songName="";
	}
	
	
	if(!empty($_POST['position']))
		$position=$_POST['position'];
	else{
		//mirar la ultima posicion de la lista
		$consulta ="SELECT MAX(posList) FROM links where idList=\"$rowIdList[0]\"";
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
	 
	// echo $nameList, $songName, $position, $singer, $url, $choice; 
	try {
			 	 $resultado = mysqli_query($conexion,"INSERT INTO links (name, posList, artist, link, provider, idList) values ('".$songName."','".$position."','".$singer."','".$url."','".$choice."','".$rowIdList[0]."') ");
				 if (!$resultado){
				 		echo "false3";
					}
				 else{
				 	//$_SESSION["N_linksEnLista"]++;
				    echo "true";
	
				  } 	
	    } catch (ErrorException $e) {
	        // este bloque no se ejecuta, no coincide el tipo de excepción
	   
	    } catch (Exception $e) {
	        // este bloque captura la excepción
	
	    }

	include "close_conexion.php";
}
else{
	echo "false4";
	
}
?>