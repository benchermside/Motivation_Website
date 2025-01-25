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

$username = $_POST["userName"];
$gotToken = $_POST["token"];
$rewardSRC = $_POST["rewardImage"];
$newNumSpins = $_POST["numSpins"];
$gotTryAgain = $_POST["gotTryAgain"];




try {
    $conn = new PDO("sqlsrv:server = tcp:motivation-database-server.database.windows.net,1433; Database = motivationDatabase", "bcherm", $SQLpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print "Error connecting to SQL Server.";
    die(print_r($e));
}

function decrementNumSpins($usernameToDecrement, $conn) {
    
    $getNumSpins = $conn->prepare(query: "SELECT numSpins FROM users WHERE userName=:userName;");
    $getNumSpins->bindparam("userName", $usernameToDecrement);
    $getNumSpins->execute();
    $numSpinsQuerryResult = $getNumSpins->fetchAll();
    $numSpinsResult = intval($numSpinsQuerryResult[0]["numSpins"]);
    $decrementedNumSpins = $numSpinsResult - 1;
    $updateNumSpins = $conn->prepare("UPDATE users (numSpins) VALUES (:newNumSpins) WHERE userName=:userName;");
    $updateNumSpins->bindparam("newNumSpins", $decrementedNumSpins, PDO::PARAM_STR);
    $updateNumSpins->bindparam("userName", $usernameToDecrement, PDO::PARAM_STR);
    $updateNumSpins->execute();
}



$stmt = $conn->prepare("SELECT token from users WHERE userName=:username;");
$stmt->bindparam("username", $username, PDO::PARAM_STR);
$stmt->execute();
$savedTokenList = $stmt->fetchAll();
$maxNumTrys = 30;//after this menay trys at genorating a unuque token the program exits having failed
$savedToken = $savedTokenList[0]["token"];

if($gotTryAgain === "no"){
    if($savedToken === $gotToken){
        $numTrys = 0;
        $stillSerching = true;
        $randomID = null;
        while($numTrys<$maxNumTrys && $stillSerching){
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
        if($numTrys === $maxNumTrys && $stillSerching === true){
            print "server error try again";
        }
        else{
            $stmt = $conn->prepare("INSERT INTO rewards (UserRewardID, userName, src) VALUES (:rewardID, :userName, :src);");
            $stmt->bindparam("rewardID", $randomID, PDO::PARAM_STR);
            $stmt->bindparam("userName", $username, PDO::PARAM_STR);
            $stmt->bindparam("src", $rewardSRC, PDO::PARAM_STR);
            $stmt->execute();
            decrementNumSpins($username, $conn);

            // $getNumSpins = $conn->prepare(query: "SELECT numSpins FROM users WHERE userName=:userName;");
            // $getNumSpins->bindparam("userName", $username);
            // $getNumSpins->execute();
            // $numSpinsQuerryResult = $getNumSpins->fetchAll();
            // $numSpinsResult = intval($numSpinsQuerryResult[0]["numSpins"]);
            // $decrementedNumSpins = $numSpinsResult - 1;
            // $updateNumSpins = $conn->prepare("INSERT INTO users (numSpins) VALUES (:newNumSpins) WHERE userName=:userName;");
            // $updateNumSpins->bindparam("newNumSpins", $decrementedNumSpins, PDO::PARAM_STR);
            // $updateNumSpins->bindparam("userName", $username, PDO::PARAM_STR);
            // $updateNumSpins->execute();

            //print $newNumSpins;
        }

    }
    else{
        print "authentication error";
    }
}
else{
    decrementNumSpins($username, $conn);
}


