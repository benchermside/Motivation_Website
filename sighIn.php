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


//, check if entered username and password meet standerd requirments
$signedIn = true;
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
        echo"User exists with username, try again";
    }
    else{
        $userSalt = bin2hex(random_bytes(32 / 2));//length 32 byte random str
        $saltedPass = hash("sha256", $password . $userSalt);
        $currToken = bin2hex(random_bytes(32 / 2));
        $saveData = $conn->prepare(query: "INSERT INTO users (userName, saltedPass, salt, numSpins) VALUES (?, ?, ?, 0);");
        $stmt->bind_param("sss", $username, $saltedPass, $userSalt);

        //return user to website and send $currToken back to user
        include"main.html";
        print'<div id="phpInfo" hidden="hidden">sent Info</div>';
    
    }
}
else{//the user is not creating a new account
    //at some point, make this an else if that ensures that nothing unusual happened
    //echo "old user";
    $stmt = $conn->prepare("SELECT saltedPass from users WHERE userName=?;");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $results = $stmt->get_result();
    

    $userNamePassward = "0";//make this get the password for the corrosponding username
    $userNameSalt = "0";//make this get the salt for the corrosponding username
    $hashedEnteredPassword = hash("sha256", $password . $userNameSalt);
    if($hashedEnteredPassword === $userNamePassward){
        //sign the user in
        $currToken = bin2hex(random_bytes(32 / 2));
        //save currToken in SQL
        //send currToken to user        
    }
    else{
        //reject sign in attempt
    }
    include"main.html";
    print'<div id="phpInfo" hidden="hidden">sent Info</div>';

}

if ($signedIn){
    //retreve users tasks form SQL
    //send user user's task list
    //send user the webpage
}



// $sql = "";

// $result = $conn->query($sql);
// $conn->close();