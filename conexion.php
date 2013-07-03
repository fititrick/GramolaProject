
<?php 
/*
***********************************************************************************************************************************
Funcion:Realiza la conexion a la base de datos en MySql
Nombre:conexion.php
***********************************************************************************************************************************
*/
				header("Content-Type: text/html;charset=utf-8");
				//gramola.sytes.net
				/*
					Realizamos la conexion a la base de datos.
					1º Lugar donde se encuentra.
					2º Usuario de la base de datos.
					3º Contraseña.

				*/
				$conexion=mysqli_connect("gramola.sytes.net", "Gramola", "GramolaPro");

				// Check connection
				if (mysqli_connect_errno($conexion))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  					} 
  				else {
							mysqli_select_db($conexion, "proyecto");
				}
				
?>