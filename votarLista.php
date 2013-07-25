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
	$idUser=$_SESSION["idUser"];
	
		
		$consulta="SELECT Score FROM votelist where idUser=\"$idUser\" and idList=\"$list\"";
		$result=mysqli_query($conexion,$consulta) ;
		if (mysqli_num_rows($result)==1){
			
			while( $row = mysqli_fetch_row($result) ) {
					mysqli_query($conexion,"UPDATE votelist SET Score=\"$score\" WHERE idUser=\"$idUser\" AND idList=\"$list\" ");
					echo true;	
					
				}
						
		}
		else{
			$resultado = mysqli_query($conexion,"INSERT INTO votelist (Score, idUser, idList) values ('".$score."', '".$idUser."','".$list."' ) ");
				 if (! $resultado){
				 		echo "<p>No se pudo efectuar, error en los datos ----- $score $idUser  $list\n";
					}
				 else{
				    echo true;
	
				  }
			
			}
			
				 				
			}
			else{


	echo false;
}
?>