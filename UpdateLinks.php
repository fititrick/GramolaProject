<?php
header("Content-Type: text/html;charset=utf-8");

//inicio la sesion
session_start();
//comprueba que el usuario estaba autentificado
if($_SESSION["autentificado"]=="SI"){
	include "conexion.php";	
	$NList=$_SESSION["NList"];
	$idUser=$_SESSION["idUser"];
	$consulta ="SELECT name, posList, idLink, artist, genre, link, provider FROM links where idList=\"$NList\" order by posList";	
	
	$result=mysqli_query($conexion, $consulta) ;

	if (mysqli_num_rows($result)==0){
	  //echo "<p>No se pudo efectuar la consulta de la tabla <b>lists</b></p>\n";
	}
		
	$i=0;
	if(mysqli_num_rows($result)>0){
		while( $row = mysqli_fetch_row($result) )
	    {
	    	$consulta2="SELECT Score FROM votelinks where idList=\"$NList\" AND idLink=\"$row[2]\" AND idUser=\"$idUser\" ";
			$result2=mysqli_query($conexion, $consulta2) ;
			//aqui compruebo si los links ya han sido votados.
			$row2= mysqli_fetch_row($result2);
			if (mysqli_num_rows($result2)==0){
				$title="yes";
				$src1="./images/fotoPlatano32_dark.png";
				$src2="./images/fotoPlatano32_dark.png";
				$src3="./images/fotoPlatano32_dark.png";
				$src4="./images/fotoPlatano32_dark.png";
				$src5="./images/fotoPlatano32_dark.png";
			}
			else{
				$title="no";
				switch ($row2[0]) {
					case '1':
						$src1="./images/fotoPlatano32.png";	$src2="./images/fotoPlatano32_dark.png"; $src3="./images/fotoPlatano32_dark.png"; $src4="./images/fotoPlatano32_dark.png"; $src5="./images/fotoPlatano32_dark.png";
						break;
					case '2':
						$src1="./images/fotoPlatano32.png";	$src2="./images/fotoPlatano32.png"; $src3="./images/fotoPlatano32_dark.png"; $src4="./images/fotoPlatano32_dark.png"; $src5="./images/fotoPlatano32_dark.png";
						break;
					case '3':
						$src1="./images/fotoPlatano32.png"; $src2="./images/fotoPlatano32.png"; $src3="./images/fotoPlatano32.png"; $src4="./images/fotoPlatano32_dark.png"; $src5="./images/fotoPlatano32_dark.png";
						break;
					case '4':
						$src1="./images/fotoPlatano32.png"; $src2="./images/fotoPlatano32.png"; $src3="./images/fotoPlatano32.png"; $src4="./images/fotoPlatano32.png"; $src5="./images/fotoPlatano32_dark.png";
						break;
					case '5':
						$src1="./images/fotoPlatano32.png"; $src2="./images/fotoPlatano32.png"; $src3="./images/fotoPlatano32.png";  $src4="./images/fotoPlatano32.png"; $src5="./images/fotoPlatano32.png";
						break;
				}
			}
			
	    	++$i;
			$boton="boton'.$row[2].'";
			 //$line = '<div id="list'.$var.'">'.$row[0].', list nº: '.$row[0].'</div>';	
	    	 echo '<tr ><td><a id="Link'.$row[2].'" class="link" name='.$row[5].' title='.$row[6].' href="#" >'.$row[0].'</a></td>';
			 echo '<td >'.$row[3].'</td>';
			 echo '<td class="linkIcon">'.$row[6].'</td>';
			 echo '<td class="PosLinkInList">'.$row[1].'</td>';
			 echo '<td><div class:"votePanel">
			 		
			<button  id="banana1" title= "'.$row[2].'" name="1" type="submit" class="buttonOfVotes"><img class="'.$boton.'" name="1" title="'.$title.'" onmouseover="colorImg(this)" src="'.$src1.'" onmouseout="normalImg(this)" onClick="pulseImg(this)" border="0" alt="banana" width="22" height="20"></button>
			<button  id="banana2" title= "'.$row[2].'" name="2" type="submit" class="buttonOfVotes"><img class="'.$boton.'" name="2" title="'.$title.'" onmouseover="colorImg(this)" src="'.$src2.'" onmouseout="normalImg(this)" onClick="pulseImg(this)" border="0"  alt="banana" width="22" height="20"></button>
			<button  id="banana3" title= "'.$row[2].'" name="3" type="submit" class="buttonOfVotes"><img class="'.$boton.'" name="3" title="'.$title.'" onmouseover="colorImg(this)" src="'.$src3.'" onmouseout="normalImg(this)" onClick="pulseImg(this)" border="0"  alt="banana" width="22" height="20"></button>
			<button  id="banana4" title= "'.$row[2].'" name="4" type="submit" class="buttonOfVotes"><img class="'.$boton.'" name="4" title="'.$title.'" onmouseover="colorImg(this)" src="'.$src4.'" onmouseout="normalImg(this)" onClick="pulseImg(this)" border="0"  alt="banana" width="22" height="20"></button>
			<button  id="banana5" title= "'.$row[2].'" name="5" type="submit" class="buttonOfVotes"><img class="'.$boton.'" name="5" title="'.$title.'" onmouseover="colorImg(this)" src="'.$src5.'" onmouseout="normalImg(this)" onClick="pulseImg(this)" border="0"  alt="banana" width="22" height="20"></button>
			 			</div>
			 	   </td> ';
			 echo '<td><button id="b_BorrarLink"  title= "Delete" name="'.$row[2].'" type="submit" value= "'.$i.'" data-theme="b" class="buttonDelLink"><target="_blank"> <img src="./images/eliminar32.png"></img></button></td></tr>';
			//aqui habria que meter un nuevo elemento de la tabla que sea la x para borrar con otra classe
		}
		//meter en session el numero de links de la lista
		//$_SESSION["N_linksEnLista"]=$i;
	}
}
else {
	echo "<p>Session Dead</p>\n";
}

?>
