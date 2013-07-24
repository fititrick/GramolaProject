<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$usuario=$_SESSION["idUser"];
	$nameLista = ($_POST["select-choice-4"]);
	
	$consulta ="SELECT idList FROM lists where idUser=\"$usuario\" and name=\"$nameLista\"";	
	$result=mysqli_query($con, $consulta) ;	
	$row=mysqli_fetch_row($result);
	
	$consulta2 ="SELECT name FROM links where idList=\"$row[0]\" ";	
	$result2=mysqli_query($con, $consulta2) ;

	if(mysqli_num_rows($result)>0){
		while( $row2 = mysqli_fetch_row($result) )
	    {
	    		    				

					       $line='<option  value="'.$row2[0].'">'.$row2[0].'</option>';
					            
						
						echo $line;
			
						
		}
	}
}
else {
	echo "<p>Session Dead</p>\n";
}
?>