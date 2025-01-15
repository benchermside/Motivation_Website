<?php
echo "hi world";
require "pass.php";
$SQLservername = "localhost";
$SQLusername = "bchermsi";
$SQLpassword = getpass();
$SQLdbname = "bchermsi";

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

//$conn = new mysqli($SQLservername, $SQLusername, $SQLpassword, $SQLdbname);
$conn = new PDO("mysql:host=$SQLservername;dbname=$SQLdbname",$SQLusername,$SQLpassword);
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }
// else{
//     echo"connected";
// }

$username = $_GET["userName"];
$password = $_GET["password"];
$newUser = $_GET["newUser"];
echo $username;
echo $password;
echo $newUser;


// $sql = "";

// $result = $conn->query($sql);
// $conn->close();