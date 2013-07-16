<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	if(!empty($_POST['id'])){
		$_SESSION["NList"]=$_POST['id'];
	}
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
			 echo '<td >'.$row[4].'</td>';
			 echo '<td class="linkIcon">'.$row[6].'</td>';
			 echo '<td class="PosLinkInList">'.$row[1].'</td>';
			 echo '<td><div class:"votePanel">
			 			<button id="banana1"  title= "1 banana"  name="1" type="submit" data-theme="b" class="buttonOfVotes"><img src="./images/fotoPlatano32.png"></img></button>
			 			<button id="banana2"  title= "2 bananas" name="2" type="submit" data-theme="b" class="buttonOfVotes"><img src="./images/fotoPlatano32.png"></img></button>
			 			<button id="banana3"  title= "3 bananas" name="3" type="submit" data-theme="b" class="buttonOfVotes"><img src="./images/fotoPlatano32.png"></img></button>
			 			<button id="banana4"  title= "4 bananas" name="4" type="submit" data-theme="b" class="buttonOfVotes"><img src="./images/fotoPlatano32.png"></img></button>
			 			<button id="banana5"  title= "5 bananas" name="5" type="submit" data-theme="b" class="buttonOfVotes"><img src="./images/fotoPlatano32.png"></img></button>
			 			
			 	   </td> ';
			 echo '<td><button id="b_BorrarLink"  title= "Delete" name="'.$row[2].'" type="submit" value= "'.$i.'" data-theme="b" class="buttonDelLink"><target="_blank"> <img src="./images/eliminar32.png"></img></button></td></tr>';
			//aqui habria que meter un nuevo elemento de la tabla que sea la x para borrar con otra classe
			
			
		}
	}
}
else {
	echo "<p>Session Dead</p>\n";
}

?>
