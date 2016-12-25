<?php

session_start();

// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

// product object
include_once '../objects/user.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$userObject = '';

if(isset($_SESSION['id'])) {
    $user->id = $_SESSION['id'];
    $userObject = $user->readOne();
}
echo $userObject;