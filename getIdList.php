<?php
	    header("Content-Type: text/html;charset=utf-8");
	
	//inicio la sesion
	session_start();
	//comprueba que el usuario estaba autentificado
	if($_SESSION["autentificado"]=="SI"){
		if(!empty($_SESSION["NList"])){
			$NLink=$_SESSION["NList"];
			echo $NLink;
		}
		else {
			echo -1;
		}
	}
	else {
		
		echo -1;
	}

?>