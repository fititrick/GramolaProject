<?php
header("Content-Type: text/html;charset=utf-8");
if(isset($_POST['name'])){
	include "conexion.php";	
	session_start();
	$usuario=$_SESSION["idUser"];
	$nameList=$_POST['name'];
	$consulta ="SELECT * FROM lists where idUser=\"$usuario\" and name=\"$nameList\"";
	$result=mysqli_query($conexion,$consulta);	
	try {
			if (mysqli_num_rows($result)==0){
			 	 $resultado = mysqli_query($conexion,"INSERT INTO lists (name, idUser) values ('".$nameList."','".$usuario."')");
				 if (! $resultado){
				 		echo "<p>No se pudo efectuar</p>, error en los datos\n";
					}
				 else{
				    echo "Lista insertada\n";
	
				  } 	
			}
			else {
				echo "<p>No se pudo efectuar la inserccion </p>\n";
				echo "El nombre de lista ya existe";
		 		exit();
			}		 
			 

	    } catch (ErrorException $e) {
	        // este bloque no se ejecuta, no coincide el tipo de excepción
	   
	    } catch (Exception $e) {
	        // este bloque captura la excepción
	
	    }

	
	include "close_conexion.php";
}
?>