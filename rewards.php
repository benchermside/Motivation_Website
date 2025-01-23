<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

$rewardImage = $_POST["rewardImage"];

require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bcherm";
$SQLpassword = getpass();
$SQLdbname = "motivationDatabase";


try {
    $conn = new PDO("sqlsrv:server = tcp:motivation-database-server.database.windows.net,1433; Database = motivationDatabase", "bcherm", $SQLpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print "Error connecting to SQL Server.";
    die(print_r($e));
}



$stmt = $conn->prepare("SELECT token from users WHERE userName=:username;");
$stmt->bindparam("username", $username, PDO::PARAM_STR);
$stmt->execute();
$savedTokenList = $stmt->fetchAll();
$savedToken = $savedTokenList[0]["token"];
if($savedToken === $gotToken){

}
else{
    print "authentication error";
}



print $rewardImage;