<?php

// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

include_once '../objects/user.php';

session_start();

// set product property values
$result = 'false';
if(isset($_SESSION['id'])) {
    $result = "true";
}
// create the product
echo $result;