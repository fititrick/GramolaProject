<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$_SESSION["NList"]=$_POST['id'];
	$NList=$_SESSION["NList"];
	$consulta ="SELECT name, posList, idLink, artist, genre, link, provider FROM links where idList=\"$NList\" order by posList";	
	
	$result=mysqli_query($conexion, $consulta) ;

	if (mysqli_num_rows($result)==0){
	  //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
	}
	if(mysqli_num_rows($result)>0){
		while( $row = mysqli_fetch_row($result) )
	    {
	    	 //$line = '<div id="list'.$var.'">'.$row[0].', list nº: '.$row[0].'</div>';	
	    	 echo '<tr ><td><a id="Link'.$row[2].'" class="link" name='.$row[5].' title='.$row[6].' href="#" >'.$row[0].'</a></td>';
			 echo '<td >'.$row[3].'</td>';
			 echo '<td WIDTH=100>'.$row[4].'</td>';
			 echo '<td class="linkIcon">'.$row[6].'</td></tr>';
			
		}
	}
}
else {
	echo "<p>Session Dead</p>\n";
}

?>
