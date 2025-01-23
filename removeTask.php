<?php

require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bchermsi";
$SQLpassword = getpass();
$SQLdbname = "bchermsi";

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

$taskName = $_POST["userName"];
$token = $_POST["token"];
$taskID = $_POST["taskServerID"];


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
    $stmt = $conn->prepare("DELETE FROM tasks WHERE taskID=:taskIDin AND userName=:userName;");
    $stmt->bindparam("userName", $username,PDO::PARAM_STR);
    $stmt->bindparam("taskIDin", $taskID,PDO::PARAM_STR);
    $stmt->execute();
    $savedTokenList = $stmt->fetchAll();
    $savedToken = $savedTokenList[0]["token"];   
}
else{
    print "authentication error";
}

