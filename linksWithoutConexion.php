<?php
header("Content-Type: text/html;charset=utf-8");
	if(!empty($_POST['id'])){
	include "conexion.php";	
		$NList=$_POST['id'];
		session_start();
	/*	if($_SESSION["autentificado"]=="SI"){
			$_SESSION["NList"]=$NList;
		}*/
	$consulta ="SELECT name, posList, idLink, artist, genre, link, provider FROM links where idList=\"$NList\" order by posList";	
	
	$result=mysqli_query($conexion, $consulta) ;

	if (mysqli_num_rows($result)==0){
	  //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
	}
		
	$i=0;
	if(mysqli_num_rows($result)>0){
		while( $row = mysqli_fetch_row($result) )
	    {
	    	
	    	 echo '<tr ><td><a id="Link'.$row[2].'" class="linkshared" name='.$row[5].' title='.$row[6].' href="#" >'.$row[0].'</a></td>';
			 echo '<td >'.$row[3].'</td>';			 
			 echo '<td class="linkIconshared">'.$row[6].'</td>';
			 echo '<td class="PosLinkInListshared">'.$row[1].'</td>';
			//aqui habria que meter un nuevo elemento de la tabla que sea la x para borrar con otra classe
			
			
		}
	}
}
	else {
	echo "<p>Impossible to obtain the list</p>\n";
}
	
?>
