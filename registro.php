<?php
header("Content-Type: text/html;charset=utf-8");

if(isset($_POST['user']) && !empty($_POST['pass'])){
	include "conexion.php";	
	$usuario=$_POST['user'];
	$contrasena=$_POST["pass"];
	$email=$_POST["email"];	
	$consulta ="SELECT nick FROM users where nick=\"$usuario\"";
	$result=mysqli_query($conexion,$consulta) ;	
	if (mysqli_num_rows($result)==0){
		  $resultado = mysqli_query($conexion,"INSERT INTO USERS (nick, pwd, email) values ('".$usuario."', '".$contrasena."', '".$email."')");
		 if (! $resultado){
		 		echo "<p>No se pudo efectuar el registro</p>, error en los datos\n";
			}
		 else{
		    echo "<p>Registro correcto</p>\n";
			$consulta ="SELECT nick, pwd, idUser FROM users where nick=\"$usuario\"";	
			$result=mysqli_query($conexion,$consulta) ;	
			if (! $result){
			  echo "<p>No se pudo efectuar la consulta de la tabla <b>users</b></p>\n";
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
					$variable=$_SESSION["nick"];
					
					echo "Sesión iniciada por $variable";
				 }
		      }
				
		  } 	
	}
	else {
		echo "<p>No se pudo efectuar el registro</p>\n";
		echo "El usuario ya existe";
 		exit();
	}		 
	 
	include "close_conexion.php";
}
?>