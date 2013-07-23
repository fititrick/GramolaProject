<?php
function path($id){
  $ip = substr($id, 0, 1);
  $load = 'http://www.goear.com/tracker758.php?f='.$id.'';
  $load = file_get_contents($load);
  $temp = explode("=", $load);
  $num = 3;
  $path = $temp[$num];
  $path = str_replace("\"", "",$path );
  $path = str_replace(" bild", "",$path );
  return($path);
}
function name($id){
  $ip = substr($id, 0, 1);
  $load = 'http://www.goear.com/tracker758.php?f='.$id.'';
  $load = file_get_contents($load);
  $temp = explode("=", $load);
  $num = 5;
  $name = $temp[$num]." - ".$temp[$num+1];
  $name = str_replace("\" title", "",$name );
  $name = str_replace("\" />", "",$name );
  $name = str_replace("\"", "",$name );
  $name = str_replace("</songs>", "",$name );
  $name = str_replace("/>", "",$name );
  return($name);
}

$_id = $_GET['id'];
$_ip = substr($_id, 0, 1);
if($_id){
  $load = 'http://www.goear.com/tracker758.php?f='.$_id.'';
        $xml = @simplexml_load_file($load);
        if ($xml) {
            $path = $xml->song['path'];
            $artist = $xml->song['artist'];
            $title = $xml->song['title'];
            $name = $artist.' - '.$title.'';
            }
        else{
          $path = path($_id);
          $name = name($_id);
        }
}

echo json_encode(array("path" => '"'.$path.'"', "name" => $name));
//echo '"'.$path.'"';
?>