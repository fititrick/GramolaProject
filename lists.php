<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$usuario=$_SESSION["idUser"];
	$consulta ="SELECT name, idList FROM lists where idUser=\"$usuario\"";	
	$result=mysqli_query($conexion, $consulta) ;
	$consulta2="SELECT Score FROM votelist where idUser=\"$usuario\"";
	$result2=mysqli_query($conexion, $consulta2) ;
	$row2=mysqli_fetch_row($result2);
	
	
	if (mysqli_num_rows($result)==0){
	  //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
	}
	if(mysqli_num_rows($result)>0){
		while( $row = mysqli_fetch_row($result) )
	    {
	    	$consulta2="SELECT Score FROM votelist where idList=\"$row[1]\"";
			$result2=mysqli_query($conexion, $consulta2) ;
			$row2=mysqli_fetch_row($result2);
			
			//esta es la consulta de los candados
			$consulta3="SELECT rights FROM rightslist where idUser=\"$usuario\" AND idList=\"$row[1]\" ";
			$result3=mysqli_query($conexion, $consulta3) ;
			$row3=mysqli_fetch_row($result3);
			
			if($row3[0]=="Y"){
				$lock="";
			}
			else{
				$lock='<img src="./images/cerrado22.png"></img>';
			}
			
			switch($row2[0]){
				
				case 1:
					$row2[0]='<img src="./images/fotoPlatano32.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>';
					break;
				case 2:
					$row2[0]='<img src="./images/2Bananas.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>';
					break;
				case 3:
					$row2[0]='<img src="./images/3Bananas.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>
								<img src="./images/fotoPlatano32_dark.png"></img>';
					break;
				case 4:
					$row2[0]='<img src="./images/4Bananas.png"></img>
							  <img src="./images/fotoPlatano32_dark.png"></img>';
					break;
				case 5:
					$row2[0]='<img src="./images/5Bananas.png"></img>';
					break;
				default:
					$row2[0]='not yet';
					
				
			}
	    	
	    	 //$line = '<div id="list'.$var.'">'.$row[0].', list nº: '.$row[0].'</div>';	

	    	$line = '<button id="Lista'.$row[1].'" name='.$row[1].' title='.$row[0].' class="list" href="#" >'.$row[0].' '.$lock.' <br>Score: <br> '.$row2[0].' </button>';
		
			
			echo "$line";
		}
	}
}
else {
	echo "<p>Session Dead</p>\n";
}

?>

