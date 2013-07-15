<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$usuario=$_SESSION["idUser"];
	$consulta ="SELECT name, idList FROM lists where idUser=\"$usuario\"";	
	$result=mysqli_query($conexion, $consulta) ;

	if (mysqli_num_rows($result)==0){
	  //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
	}
	if(mysqli_num_rows($result)>0){
		while( $row = mysqli_fetch_row($result) )
	    {
	    	 //$line = '<div id="list'.$var.'">'.$row[0].', list nº: '.$row[0].'</div>';	

	    	$line = '<button id="Lista'.$row[1].'" name='.$row[1].' title='.$row[0].' class="list" href="#" >list nº: '.$row[1].' <br> '.$row[0].'</button>';
			
			
			echo $line;
		}
	}
}
else {
	echo "<p>Session Dead</p>\n";
}

?>

