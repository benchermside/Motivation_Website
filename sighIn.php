<?php
echo "hi world";
require "pass.php";
$SQLservername = "localhost";
$SQLusername = "bchermsi";
$SQLpassword = getpass();
$SQLdbname = "bchermsi";

//$conn = new mysqli($SQLservername, $SQLusername, $SQLpassword, $SQLdbname);
$conn = new PDO("mysql:host=$SQLservername;dbname=$SQLdbname",
$user = $SQLusername, $pw = $SQLpassword);
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