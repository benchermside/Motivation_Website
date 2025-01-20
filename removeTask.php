<?php

require "pass.php";
$SQLservername = "sql.cs.oberlin.edu";
$SQLusername = "bchermsi";
$SQLpassword = getpass();
$SQLdbname = "bchermsi";

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

//Here will connect to mySQL and deleat the task of the taskName
$taskName = $_POST["taskName"];
$taskID = $_POST["taskID"];


