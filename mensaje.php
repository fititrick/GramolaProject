<?php
header("Content-Type: text/html;charset=utf-8");
if(isset($_POST['user']) && !empty($_POST['pass']) && !empty($_POST['user'])){
	$usuario=$_POST['user'];
	$contrasena=$_POST['pass'];
	
	include "conexion.php";	
	$consulta ="SELECT nick, pwd,idUser  FROM users where nick=\"$usuario\"";	
	$result=mysqli_query($conexion, $consulta) ;

	if (mysqli_num_rows($result)==0){
	  
		//echo "User: $usuario not exist";
		try {
        	throw new Exception("User: $usuario not exist");
		    } catch (ErrorException $e) {
		        // este bloque no se ejecuta, no coincide el tipo de excepción
		        echo 'ErrorException ' . $e->getMessage();
		    } catch (Exception $e) {
		        // este bloque captura la excepción
		        echo 'Exception ' . $e->getMessage();
		    }
		//die('ERROR');
    //  or:
        //die(json_encode(array('message' => 'ERROR', code => 1337)));
	}
	if(mysqli_num_rows($result)==1){
		while( $row = mysqli_fetch_row($result) )
	    {
		   	//el 0 es el nick, el 1 la password
		     if($row[0]==$usuario && $row[1]==$contrasena){
				//defino una sesion y guardo datos
				session_start();
				$_SESSION["autentificado"]="SI";
				$_SESSION["nick"]=$row[0];
				$_SESSION["idUser"]=$row[2];
				//header("Location: principal.php");
				$variable=$_SESSION["nick"];
				echo "Session started by $variable";
			 }
			 else{
			 	echo "Incorrect Data";
				 exit();
			 }
	      }
	}
	include "close_conexion.php";
}
else {
	echo "Fail in data login";
}
?>
