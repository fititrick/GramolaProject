<?php
  header("Content-Type: text/html;charset=utf-8");
 
//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
        include "conexion.php";
        $idUser=$_SESSION["idUser"];   
        $list=$_SESSION["NList"];
        $encontrado=false;
       
          //Consultamos si existe un registro previo.
        $consulta="SELECT rights FROM rightslist WHERE idList= \"$list\" AND idUser=\"$idUser\"";      
        $result=mysqli_query($conexion, $consulta);
        while( $row = mysqli_fetch_row($result) ){
       
                                
                                if(mysqli_num_rows($result)==1){
                                       
                                          echo $row[0];
										  $encontrado=true;
                                                                    
                                }
                }
		//Esto es que no ha encontrado permisos y le paso una N para que sea privado.
		if($encontrado==FALSE)
		{
			echo "N";
		}             
}
?>