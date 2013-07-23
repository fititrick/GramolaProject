<?php 
				header("Content-Type: text/html;charset=utf-8");
				//gramola.sytes.net
				$con=mysqli_connect("gramola.sytes.net", "Gramola", "GramolaPro");

				// Check connection
				if (mysqli_connect_errno($con))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  					} 
  				else {
							mysqli_select_db($con, "proyecto");
				}
				
?>