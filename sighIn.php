<?php
echo "hi world";
include("./pass.php");
$servername = "localhost";
$username = "bchermsi";
$password = $pass;
$dbname = "bchermsi";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



// $sql = "";

$result = $conn->query($sql);
$conn->close();