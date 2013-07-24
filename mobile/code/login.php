<?php
 

include "conexion.php";	
 
$usu = ($_POST["user"]);
$pass = ($_POST["pass"]);
 
$sql = "SELECT nick FROM users WHERE nick='$usu' AND pwd='$pass'";
 
if ($resultado = mysqli_query( $conexion,$sql)){
    if (mysqli_num_rows($resultado) > 0){
    	
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
					$_SESSION["pwd"]=$row[1];
					//header("Location: principal.php");
					$variable=$_SESSION["nick"];
					
					
					echo true;
				 }
		      }

    }
}
else{
	
    echo false;
}
mysqli_close($conexion);
 
?>