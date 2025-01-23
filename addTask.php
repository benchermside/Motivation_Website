<?php
print"loded file";
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
print"started add new task PHP";

require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bcherm";
$SQLpassword = getpass();
$SQLdbname = "motivationDatabase";



$taskName = $_POST["taskName"];
$gotToken = $_POST["token"];
$username = $_POST["userName"];

$taskFrequency = $_POST["frequency"];
$taskName = $_POST["taskName"];
$taskDate = $_POST["date"];
$taskTime = $_POST["time"];
$taskDay = $_POST["day"];


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
$randomID = null;
if($savedToken === $gotToken){
    $numTrys = 0;
    $stillSerching = true;
    while($numTrys<10 && $stillSerching){
        $randomID = random_int(-2147483647, 2147483646);
        $IDCheck = $conn->prepare("SELECT taskID FROM tasks WHERE taskID=:taskid;");
        $IDCheck->bindparam("taskid", $randomID, PDO::PARAM_INT);
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
        $stmt = $conn->prepare("INSERT INTO tasks (userName, frequency, taskTime, taskDay, taskDate, taskName, taskID, lastComplete) VALUES (:userName, :frequency, :taskTime, :taskDay, :taskDate, :taskName, :taskID, null);");
        $stmt->bindparam("userName", $username, PDO::PARAM_STR);
        $stmt->bindparam("frequency", $taskFrequency, PDO::PARAM_STR);
        $stmt->bindparam("taskTime", $taskTime, PDO::PARAM_STR);
        $stmt->bindparam("taskDay", $taskDay, PDO::PARAM_STR);
        $stmt->bindparam("taskName", $taskName, PDO::PARAM_STR);
        $stmt->bindparam("taskDate", $taskDate, PDO::PARAM_STR);
        $stmt->bindparam("taskID", $randomID, PDO::PARAM_STR);
        $stmt->execute();
    }
}
else{
    print "authentication error";
}


//print'<P>called File</P>';

// require "pass.php";
// $SQLservername = "sql.cs.oberlin.edu";
// $SQLusername = "bchermsi";
// $SQLpassword = getpass();
// $SQLdbname = "bchermsi";




// $newTaskInfo = $_POST["newTask"];
// $toEcho = "<P>" . $newTaskInfo . "</P>";

// print $toEcho;
