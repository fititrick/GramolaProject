
<?php
/*
***********************************************************************************************************************************
Funcion:Realiza la insercion de usuarios en la base de datos.
Nombre: registro.php
***********************************************************************************************************************************
*/

header("Content-Type: text/html;charset=utf-8");

//Se comprueba que el POST recibe datos de usuario y contraseña.
if(isset($_POST['user']) && !empty($_POST['pass'])){
	//Archivo de conexion a la base de datos.
	include "conexion.php";	
	//Los datos se pasan a variables para poder trabajar.
	$usuario=$_POST['user'];
	$contrasena=$_POST["pass"];
	$email=$_POST["email"];	

	/*
		Se realiza la consulta sobre la base de datos para ver si existe o no ese usuario.
		En caso de que el numero de filas sea 0 se inserta sino se deshecha.
	*/
	$consulta ="SELECT nick FROM users where nick=\"$usuario\"";
	$result=mysqli_query($conexion,$consulta) ;	
	if (mysqli_num_rows($result)==0){
		  $resultado = mysqli_query($conexion,"INSERT INTO USERS (nick, pwd, email) values ('".$usuario."', '".$contrasena."', '".$email."')");
		 if (! $resultado){
		 		echo "<p>Fail in data\n";
			}
		 else{
		    //Se recoge los datos insertados en una linea para despues poder crear la sesion.
			$consulta ="SELECT nick, pwd, idUser FROM users where nick=\"$usuario\"";	
			$result=mysqli_query($conexion,$consulta) ;	
			if (! $result){
			  
				exit();
			}
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
					echo true;
				 }
		      }
				
		  } 	
	}
	else {
		echo "<p>The user already exists</p>\n";
 		exit();
	}		 
	 
	include "close_conexion.php";
}
?>