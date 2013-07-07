<?php
session_start(); 
$variable=$_SESSION["nick"];
echo "Main Page of $variable ";
?>