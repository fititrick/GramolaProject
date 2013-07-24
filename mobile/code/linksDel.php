<?php
 
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$usuario=$_SESSION["idUser"];
	$idLista = ($_POST["idList"]);	
	//echo $idLista;
	

	 
	 
//echo implode(" ",$ciudades);


	//echo $ciudades;
			
			$consulta ="SELECT name, posList, idLink, artist, genre, link, provider FROM links where idList=\"$idLista\" order by posList";	
			$result=mysqli_query($conexion, $consulta) ;
			
			
		
			if (mysqli_num_rows($result)==0){
			  //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
			}
			
			
			$line[0]=$idLista;
			
			if(mysqli_num_rows($result)>0){
				for($i=1; $row = mysqli_fetch_row($result);$i++ )
			    {
			    	
			    				
		
							       $line[$i]= '*<li  ><a  class="delink" name="'.$row[2].'" onclick="borrarLink(name)">'.$row[0].' </a></li>';
							        //$line[$i]='*<button><li  class="delink" ><a href="#">'.$row[0].' delink</a></li></button>';    
									
								
								
					
								
				}
			echo implode(" ",$line) ;
			}

}
else {
	echo "<p>Session Dead</p>\n";
}

?>