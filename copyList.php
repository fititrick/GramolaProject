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
function mysql_clonar_registro ( $tabla, $clave ) {

   // limpieza parámetros
   $tabla= mysql_real_escape_string($tabla);
   $clave= mysql_real_escape_string($clave);

   // obtener lista de campos, no únicos
   $rsCampos = mysql_query("SHOW COLUMNS FROM $tabla");
   $campos= array();
   $campoClave ="";
   while ( $campo = mysql_fetch_array($rsCampos) ){

       if ( $campo["Key"] == "PRI" ){
           $campoClave = $campo[0];
       }
       $campos[] =  $campo["Key"] == "PRI" || $campo["Key"] == "UNI" ? "NULL":    $campo[0];
   }
   mysql_free_result ( $rsCampos );

   // clonar el registro mediante una SQL
   if ( $campoClave && count($campos)>0 ) {
       $SQL = sprintf( "INSERT INTO $tabla ( SELECT %s FROM $tabla WHERE %s='%s' )",
           implode(",",$campos),
           $campoClave,
           $clave );
       mysql_query ($SQL);
       return mysql_affected_rows();
   }
   return false;
}

?>