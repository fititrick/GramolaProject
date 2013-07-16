<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$score=$_POST['numVote'];
	$nick=$_SESSION["nick"];
	$list=$_SESSION["NList"];
	
		$consulta="SELECT idUser FROM users where nick=\"$nick\"";;
		$idUser=mysqli_query($conexion,$consulta) ;
		while( $row = mysqli_fetch_row($idUser) ){
		$resultado = mysqli_query($conexion,"INSERT INTO votelist (Score, idUser, idList) values ('".$score."', '".$row[0]."','".$list."' ) ");
				 if (! $resultado){
				 		echo "<p>No se pudo efectuar, error en los datos ----- $score $row[0]  $list\n";
					}
				 else{
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