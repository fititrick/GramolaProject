<?php
 
$server = "gramola.sytes.net";
$username = "Gramola";
$password = "GramolaPro";
$database = "proyecto";
 
 
$conexion=mysqli_connect("gramola.sytes.net", "Gramola", "GramolaPro")or die ("No se conecto: " . mysql_error());;
mysqli_select_db($conexion, "proyecto");
 
$usu = ($_POST["user"]);
$pass = ($_POST["pass"]);
$passConf = ($_POST["passConf"]);
$email = ($_POST["email"]);
 
 
 
$sql = "SELECT nick FROM users WHERE nick='$usu' AND pwd='$pass'";
 
if ($resultado = mysqli_query( $conexion,$sql)){
    if (mysqli_num_rows($resultado) == 0){
    	if($pass==$passConf){
    	 $resultado2 = mysqli_query($conexion,"INSERT INTO USERS (nick, pwd, email) values ('".$usu."', '".$pass."', '".$email."')");
		 if (! $resultado2){
		 		echo "No se pudo efectuar el registro, error en los datos $usu  $email\n";
			}
		 else{
		    //echo true;
		    //Se recoge los datos insertados en una linea para despues poder crear la sesion.
			$consulta ="SELECT nick, pwd, idUser FROM users where nick=\"$usu\"";	
			$result=mysqli_query($conexion,$consulta) ;	
			if (! $result){
			  echo "<p>No se pudo efectuar la consulta de la tabla <b>users</b></p>\n";
				exit();
			}
			while( $row = mysqli_fetch_row($result) )
		    {
			   	//el 0 es el nick, el 1 la password
			     if($row[0]==$usu && $row[1]==$pass){
					//defino una sesion y guardo datos
					session_start();
					$_SESSION["autentificado"]="SI";
					$_SESSION["nick"]=$row[0];
					$_SESSION["idUser"]=$row[2];
					//header("Location: principal.php");
					$variable=$_SESSION["nick"];
					
					echo true;
				 }
		      }
				
		  	}
		  }
		else{
			echo"las contraseñas no coinciden";
	
		} 	
	}
	}
      

else{
	
    echo false;
}
mysqli_close($conexion);
 
?>