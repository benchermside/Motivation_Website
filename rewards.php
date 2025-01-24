<?php

// ini_set('display_startup_errors', 1);
// ini_set('display_errors', 1);
// error_reporting(-1);

$rewardImage = $_POST["rewardImage"];

require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bcherm";
$SQLpassword = getpass();
$SQLdbname = "motivationDatabase";

$username = $_POST["userName"];
$gotToken = $_POST["token"];
$rewardSRC = $_POST["rewardImage"];




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
    $numTrys = 0;
    $stillSerching = true;
    $randomID = null;
    while($numTrys<10 && $stillSerching){
        $randomID = random_int(-2147483647, 2147483646);
        $IDCheck = $conn->prepare("SELECT UserRewardID FROM rewards WHERE UserRewardID=:rewardID;");
        $IDCheck->bindparam("rewardID", $randomID, PDO::PARAM_INT);
        $IDCheck->execute();
        $allResults = $IDCheck->fetchAll();
        if(count($allResults) === 0){
            $stillSerching = false;
        }
        $numTrys++;
    }
    if($numTrys === 10 && $stillSerching === true){
        print "server error try again";
    }
    else{
        $stmt = $conn->prepare("INSERT INTO rewards (UserRewardID, userName, src) VALUES (:rewardID, :userName, :src);");
        $stmt->bindparam("rewardID", $randomID, PDO::PARAM_STR);
        $stmt->bindparam("userName", $username, PDO::PARAM_STR);
        $stmt->bindparam("src", $rewardSRC, PDO::PARAM_STR);
        $stmt->execute();
    }

}
else{
    print "authentication error";
}



