<?php
echo"started runing";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bcherm";
$SQLpassword = "obu3mX99AvdBi3";
$SQLdbname = "bchermsi";


try {
    $conn = new PDO("sqlsrv:server = tcp:motivation-database-server.database.windows.net,1433; Database = motivationDatabase", "bcherm", $SQLpassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

$createUserTable = "CREATE TABLE users (
userName  VARCHAR(32) PRIMARY KEY,
salt VARCHAR(32) NOT NULL,
saltedPass VARCHAR(32) NOT NULL,
numSpins SMALLINT);";

$createTaskTable = "CREATE TABLE tasks (
taskID INT PRIMARY KEY,
userName VARCHAR(32) FOREIGN KEY REFERENCES users(userName),
frequency VARCHAR(8),
taskTime VARCHAR(5),
taskDay VARCHAR(9),
taskDate VARCHAR(10),
taskName VARCHAR(100),
);";


$createRewadsTable = "CREATE TABLE rewards (
UserRewardID INT PRIMARY KEY,
userName VARCHAR(32) FOREIGN KEY REFERENCES users(userName),
src VARCHAR(128),
);";

if ($conn->query($createUserTable) === TRUE) { 
      echo "Database has been created successfully"; 
} else { 
      echo "Error creating database: " . $conn->error; 
} 
$conn->close(); 
echo"ended runing";
