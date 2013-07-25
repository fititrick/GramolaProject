<?php

/*/* Abrimos la base de datos */

header("Content-Type: text/html;charset=utf-8");
include "conexion.php";	
session_start(); 
$nickpass=$_SESSION["nick"];

   
/* Realizamos la consulta SQL */

$consulta="SELECT * FROM users where nick=\"$nickpass\"";
$result=mysqli_query($conexion,$consulta) ;	

if (mysqli_num_rows($result)==0)die("No hay registros para mostrar");


/* Desplegamos cada uno de los registros dentro de una tabla */  
echo "<TABLE WIDTH='70%' height='50%' CELLPADDING='2' CELLSPACING='0' BORDER='0'   >";


/*Priemro los encabezados*/
 echo "<tr>
       <tr>
         <th> <font color='black'>Avatar  </font>  </th><th></th><th></th><th> <font color='black'>Nick </font>  </th><th></th><th></th></th><th></th><th>
         <th> <font color='black'>Email </font>  </th>
      </tr>";
	  
	  

/*Y ahora todos los registros */
while($array = mysqli_fetch_array($result) ) {

 echo "<tr>
         <td ROWSPAN='2' ALIGN=CENTER><img src='$array[imgPerfil]'  alt='prueba imagen perfil' border='5%' height='100' width='100' /></td><td></td><td></td>
          
         <td height='45' width='200'><font color='black'> $array[nick] </font></td><td></td><td></td><td></td><td></td>
          
         <td height='45' width='200'><font color='black'> $array[email] </font></td>
               </tr>";
}
echo "</table>";



?>