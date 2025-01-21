<?php
//echo "hi world";
require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bcherm";
$SQLpassword = getpass();
$SQLdbname = "motivationDatabase";

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

// try {
//     $conn = new PDO("sqlsrv:server = tcp:motivation-database-server.database.windows.net,1433; Database = motivationDatabase", "bcherm", $SQLpassword);
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// }
// catch (PDOException $e) {
//     print("Error connecting to SQL Server.");
//     die(print_r($e));
// }



//$conn = new mysqli($SQLservername, $SQLusername, $SQLpassword, $SQLdbname);


//This will connect to the SQL server in future
//$conn = new PDO(dsn: "mysql:host=$SQLservername;dbname=$SQLdbname",$SQLusername,$SQLpassword);

try {
    $conn = new PDO("sqlsrv:server = tcp:motivation-database-server.database.windows.net,1433; Database = motivationDatabase", "bcherm", $SQLpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }
// else{
//     echo"connected";
// }

$username = $_POST["userName"];
$password = $_POST["password"];
$newUser = $_POST["newUser"];
// echo $username;
// echo $password;
// echo $newUser;
$validUser = strlen($username) < 32;

//should check if username is valid
// for ($i = 0; $i < strlen($username); $i++) {
//     if($username.)
// }
$goodUsername = preg_match('/^[a-z0-9_A-Z]{1,32}+$/', $username);


//, check if entered username and password meet standerd requirments
$signedIn = false;
if ($newUser === "on"){//This checks to see if the user is creating a new account
    //echo "new user";
    //check if there is a user with the same username, if not
    // prepare and bind
    $stmt = $conn->prepare("SELECT userName from users WHERE userName=?;");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $results = $stmt->get_result();
    $userExists = ($results->num_rows) > 0;
    if($userExists){
        include"index.html";
        echo"User exists with username, try again";
    }
    else{
        $userSalt = bin2hex(random_bytes(32 / 2));//length 32 byte random str
        $saltedPass = hash("sha256", $password . $userSalt);
        $saveData = $conn->prepare(query: "INSERT INTO users (userName, saltedPass, salt, numSpins) VALUES (?, ?, ?, 0);");
        $saveData->bind_param("sss", $username, $saltedPass, $userSalt);
        $saveData->execute();
        $signedIn = true;
        //print'<div id="phpInfo" hidden="hidden" info="test"></div>';
    
    }
}
else{//the user is not creating a new account
    //at some point, make this an else if that ensures that nothing unusual happened
    //echo "old user";
    $stmt = $conn->prepare("SELECT saltedPass, salt from users WHERE userName=?;");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $results = $stmt->get_result();
    if( $results->num_rows > 0){
        $firstRow = mysqli_fetch_assoc($result);
        $existPass = $firstRow["saltedPass"];
        $existSalt = $firstRow["salt"];
        $saltedEnteredPass = hash("sha256", $password . $existSalt);
        
        if($saltedEnteredPass === $existPass){
            $signedIn = true;
        }
        else{
            include"index.html";
            echo"incorrect username or password";
        }
    }
    else{
        include"index.html";
        echo"incorrect username or password";
    }


    // $userNamePassward = "0";//make this get the password for the corrosponding username
    // $userNameSalt = "0";//make this get the salt for the corrosponding username
    // $hashedEnteredPassword = hash("sha256", $password . $userNameSalt);
    // print'<div id="phpInfo" hidden="hidden">sent Info</div>';

}

if ($signedIn){
    include"main.html";
    $currToken = bin2hex(random_bytes(32 / 2));
    $toExecute = $conn ->prepare("UPDATE users SET token=? WHERE userName=?");
    $toExecute->bind_param("ss", $currToken, $username);
    $toExecute->execute();//this saves the token genorated

    $getNumSpins = $conn->prepare("SELECT numSpins FROM users WHERE userName=?");
    $getNumSpins->bind_param("s", $username);
    $getNumSpins->execute();
    $numSpinsResult = $numSpins->get_result();
    $firstRow = mysqli_fetch_assoc($result);
    $numSpinsReturned = $firstRow["numSpins"];
    $getTasksStatment = $conn->prepare("SELECT taskID, frequency, taskTime, taksDay, taskDate, taskName FROM tasks WHERE userName=?");
    $getTasksStatment ->bind_param("s", $username);
    $getTasksStatment -> execute();
    $userTaskResults = $getTasksStatment -> get_result();
    $taskCount = 0;
    while($row = $userTaskResults->fetch_assoc()){
        $currTaskID = $row["taskID"];
        $currTaskfrequency = $row["frequency"];
        $currTasktaskTime = $row["taskTime"];
        $currTaskDay = $row["taksDay"];
        $currTaskDate = $row["taskDate"];
        $currTaskName = $row["taskName"];
        print('<div id="task' . $taskCount . '" hidden="hidden" taskID="' . $currtaskID .  '"frequency="' . $currTaskfrequency .'" time="' . $currTasktaskTime .'" date="'. $currTaskDate .'" day="' . $currTaskDay .'" taskName="'. $currTaskName .'"></div>');
        $taskCount++;
    }
    $getRewardStatment = $conn->prepare("SELECT src FROM tasks WHERE userName=?");
    $getRewardStatment ->bind_param("s", $username);
    $getRewardStatment -> execute();
    $userRewardResults = $getRewardStatment -> get_result();
    $rewardCount = 0;
    while($row = $userRewardResults->fetch_assoc()){
        $rewardSRC = $row["src"];
        print('<div id="imgid' . $rewardCount . '" hidden="hidden" info="' . $rewardSRC . '"></div>');
        $taskCount++;
    }
    print('<div id="userName" hidden="hidden" info="' . $username . '"></div>');
    print('<div id="token" hidden="hidden" info="' . $currToken . '"></div>');

    

    //retreve users tasks form SQL
    //send user user's task list
    //send user the webpage
}



$conn->close();