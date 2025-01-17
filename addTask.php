<?php
require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bchermsi";
$SQLpassword = getpass();
$SQLdbname = "bchermsi";

$newTaskInfo = $_POST["newTask"];

echo$newTaskInfo;
