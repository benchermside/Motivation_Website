<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

// ++$numSpins;.... add 1 to number of spins in this file because this file runs when the checkbox of a task is checked

// make this do something

require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bcherm";
$SQLpassword = getpass();
$SQLdbname = "motivationDatabase";



$gotToken = $_POST["token"];
$username = $_POST["userName"];
$taskID = $_POST["taskID"];
$lastComplete = $_POST["lastComplete"];


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
    $stmt = $conn->prepare("UPDATE tasks SET lastComplete=:newLastComplete WHERE taskID=:serverID AND userName=:userName;");
    $stmt->bindparam("newLastComplete", $lastComplete, PDO::PARAM_STR);
    $stmt->bindparam("serverID", $taskID, PDO::PARAM_STR);
    $stmt->bindparam("userName", $username, PDO::PARAM_STR);
    $stmt->execute();

}
else{
    print "authentication error";
}

