<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$score=$_POST['numVote'];
	$user=1;
	$link=1;
	$list=1;
		
		$resultado = mysqli_query($conexion,"INSERT INTO votelinks (Score, idUser, idLink, idList) values ('".$score."', '".$user."', '".$link."','".$list."' ) ");
				 if (! $resultado){
				 		echo "<p>No se pudo efectuar, error en los datos $score $user $link $list\n";
					}
				 else{
				    echo "<p>vote inserted $score $user $link $list</p>\n";
	
				  } 
		//echo"$score $user $link $list";
		//echo true;
}
else
{
	echo false;
}
?>