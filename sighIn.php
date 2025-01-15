<?php
echo "hi world";
include("./pass.php");
$SQLservername = "localhost";
$SQLusername = "bchermsi";
$SQLpassword = $pass;
$SQLdbname = "bchermsi";

//$conn = new mysqli($SQLservername, $SQLusername, $SQLpassword, $SQLdbname);

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
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