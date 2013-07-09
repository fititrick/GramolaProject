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
	$i=0;
	if(mysqli_num_rows($result)>0){
		while( $row = mysqli_fetch_row($result) )
	    {
	    	++$i;
	    	 //$line = '<div id="list'.$var.'">'.$row[0].', list nº: '.$row[0].'</div>';	
	    	 echo '<tr ><td><a id="Link'.$row[2].'" class="link" name='.$row[5].' title='.$row[6].' href="#" >'.$row[0].'</a></td>';
			 echo '<td >'.$row[3].'</td>';
			 echo '<td WIDTH=100>'.$row[4].'</td>';
			 echo '<td class="linkIcon">'.$row[6].'</td>';
			 echo '<td><button id="b_BorrarLink" name="'.$row[2].'" type="submit" value= "'.$i.'" data-theme="b" class="buttonDelLink"> <img src="./images/eliminar32.png"></img></button></td></tr>';
			//aqui habria que meter un nuevo elemento de la tabla que sea la x para borrar con otra classe
			
			
		}
	}
}
else {
	echo "<p>Session Dead</p>\n";
}

?>
