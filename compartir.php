<?php
	    header("Content-Type: text/html;charset=utf-8");
	  ini_set("session.use_cookies",0);
     ini_set("session.use_only_cookies",0);
     ini_set("session.use_trans_sid",1);
	//inicio la sesion
	session_start();
	//comprueba que el usuario estaba autentificado
	if($_SESSION["autentificado"]=="SI"){
		$NLink=$_SESSION["NList"];
		echo $NLink;
	}
	

?>

