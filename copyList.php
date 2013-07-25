<?php
header("Content-Type: text/html;charset=utf-8");
if(isset($_POST['name'])){
	include "conexion.php";	
	session_start();
	$usuario=$_SESSION["idUser"];
	$nameList=$_POST['name'];
	$listaVieja=$_POST['idList'];
	$consulta ="SELECT * FROM lists where idUser=\"$usuario\" and name=\"$nameList\"";
	$result=mysqli_query($conexion,$consulta);	
	try {
			if (mysqli_num_rows($result)==0){
			 	 $resultado = mysqli_query($conexion,"INSERT INTO lists (name, idUser) values ('".$nameList."','".$usuario."')");
				 if (! $resultado){
				 		echo false;
					}
				 else{
				 	$query = "select idList from lists where idUser='".$usuario."' order by idList DESC";
$result = $conexion->query($query);

/* numeric array */
$row = $result->fetch_array(MYSQLI_NUM);

				 	//primero saber el id de la nueva lista y guardarlo en '".$numberList."'
				 	$numberList = substr($row[0],0,2);
				 	//despues copiar
				 	$variable="INSERT INTO links (provider, link, posList, name, artist, genre, visits, idList) (select provider, link, posList, name, artist, genre, visits, $numberList from links where idList=$listaVieja )";
				 	mysqli_query($conexion,$variable);
				 	$afectadas=mysqli_affected_rows($conexion);
					echo true;
					
	
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
function mysql_clonar_registro ( $tabla, $clave ) {
include "conexion.php";	
   // limpieza parámetros
   $tabla= mysql_real_escape_string($tabla);
   $clave= mysql_real_escape_string($clave);
echo "tabla: $tabla\n";

   // obtener lista de campos, no únicos
   $rsCampos = mysqli_query($conexion,"SHOW COLUMNS FROM $tabla");
   $campos= array();
   $campoClave ="idList";
    while ( $campo = mysql_fetch_array($rsCampos) ){
  	 echo "Campo $campo[0]";
	}
   mysqli_free_result ( $rsCampos );
	
   // clonar el registro mediante una SQL
   
       $SQL = sprintf( "INSERT INTO $tabla ( SELECT * FROM $tabla WHERE %s='%s' )",
           implode(",",$campos),
           $campoClave,
           $clave );
		   echo "la senencia $SQL\n";
       mysqli_query ($conexion,$SQL);
       return mysqli_affected_rows($conexion);
   
   return false;
}

?>