<?php
session_start(); 
$variable=$_SESSION["nick"];
session_destroy();
echo "Session of $variable have finished";
?>