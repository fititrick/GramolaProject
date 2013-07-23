<?php
  header("Content-Type: text/html;charset=utf-8");
 
//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
        include "conexion.php";
        $idUser=$_SESSION["idUser"];   
        $list=$_SESSION["NList"];
        $boton=$_POST['cambio'];
        $opcion="";
       
        if($boton=="public")
        {               //Si el boton es publico tiene permiso de compartir.
                $opcion="Y";
               
               
        }else{
                //Si el boton no es public es private pues no se comparte.
                $opcion="N";
               
        }
 
        //Consultamos si existe un registro previo.
        $consulta="SELECT rights FROM rightslist WHERE idList= \"$list\" AND idUser=\"$idUser\"";      
        $result=mysqli_query($conexion, $consulta);
        while( $row = mysqli_fetch_row($result) ){
       
                                
                                if(mysqli_num_rows($result)==1){
                                       
                                                // aqui viene el update
                                                $consulta2 = "UPDATE rightslist SET rights=\"$opcion\" WHERE idList=\"$list\" and idUser=\"$idUser\";";
                                                $result2=mysqli_query($conexion, $consulta2);
                                                echo $result2;
                                       
                               
                                }
                }
		/*Sino existe la linea, la crea para que se encuentre un registro*/
		 //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
                                  //aqui viene la insert
           $consulta2="INSERT INTO rightslist (idUser, idList, rights) values ('".$idUser."', '".$list."', '".$opcion."')";
           $result1=mysqli_query($conexion, $consulta2);
           echo $result1;
                                       
}
?>