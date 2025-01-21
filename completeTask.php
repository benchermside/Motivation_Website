<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

// ++$numSpins;.... add 1 to number of spins in this file because this file runs when the checkbox of a task is checked

//Here will connect to mySQL and delete the task of the taskName
$taskName = $_POST["taskName"];
$taskID = $_POST["taskID"];


