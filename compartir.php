<?php
	    header("Content-Type: text/html;charset=utf-8");
	
	//inicio la sesion
	session_start();
	//comprueba que el usuario estaba autentificado
	if($_SESSION["autentificado"]=="SI"){
		$NLink=$_SESSION["NList"];
		echo $NLink;
	}
	

?>

