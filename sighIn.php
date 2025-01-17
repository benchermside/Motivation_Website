<?php
echo "hi world";
require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bchermsi";
$SQLpassword = getpass();
$SQLdbname = "bchermsi";

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

//$conn = new mysqli($SQLservername, $SQLusername, $SQLpassword, $SQLdbname);


//This will connect to the SQL server in future
$conn = new PDO("mysql:host=$SQLservername;dbname=$SQLdbname",$SQLusername,$SQLpassword);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    echo"connected";
}

$username = $_POST["userName"];
$password = $_POST["password"];
$newUser = $_POST["newUser"];
echo $username;
echo $password;
echo $newUser;




//, check if entered username and password meet standerd requirments
$signedIn = true;
if ($newUser === "on"){//This checks to see if the user is creating a new account
    echo "new user";
    //check if there is a user with the same username, if not
    $userSalt = bin2hex(random_bytes(32 / 2));//length 32 byte random str
    $saltedPass = hash("sha256", $password . $userSalt);
    $currToken = bin2hex(random_bytes(32 / 2));
    //save the $saltedPass, $username, $currToken, and the $userSalt in the MySQL database
    //return user to website and send $currToken back to user


}
else{//the user is not creating a new account
    //at some point, make this an else if that ensures that nothing unusual happened
    echo "old user";
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

}

if ($signedIn){
    //retreve users tasks form SQL
    //send user user's task list
    //send user the webpage
}



// $sql = "";

// $result = $conn->query($sql);
// $conn->close();