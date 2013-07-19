<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion   aqui votamos los links.
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$score=$_POST['numVote'];
	$nick=$_SESSION["nick"];
	$link=$_POST['idLink'];
	$list=$_SESSION["NList"];
	$idUser=$_SESSION["idUser"];
	
	$consulta="SELECT Score FROM votelinks WHERE idUser=\"$idUser\" AND idLink=\"$link\" AND idList=\"$list\"";
	$result=mysqli_query($conexion,$consulta) ;	
	if (mysqli_num_rows($result)==1){
				while( $row = mysqli_fetch_row($result) ) {
						
					mysqli_query($conexion,"UPDATE votelinks SET Score=\"$score\" WHERE idUser=\"$idUser\" AND idLink=\"$link\" AND idList=\"$list\"");
					echo true;
				}
	}
				
	else{
		
		$resultado = mysqli_query($conexion,"INSERT INTO votelinks (Score, idUser, idLink, idList) values ('".$score."', '".$idUser."', '".$link."','".$list."' ) ");
				 if (! $resultado){
				 		echo "<p>No se pudo efectuar, error en los datos ----- $score $idUser $link $list\n";
					}
				 else{
				  //  echo "<p>vote inserted $score $row[0] $link $list</p>\n";
					echo true;
				  } 
		//echo"$score $user $link $list";
		//echo true;
				}
	
		}
else
{
	echo false;
}
?>