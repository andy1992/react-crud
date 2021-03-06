<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../config/core.php';

    // include database connection
    include_once '../config/database.php';

    // product object
    include_once '../objects/product.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $product = new Product($db);

    // set product property values
    $result = 'true';
    if(is_null($_POST['name']) || empty($_POST['name'])) {
        $result = "The product name must be filled.";
    } else if(is_null($_POST['price']) || empty($_POST['price'])) {
        $result = "The price must be filled.";
    } else if(is_null($_POST['description']) || empty($_POST['description'])) {
        $result = "The description must be filled.";
    } else if(is_null($_POST['category_id']) || empty($_POST['category_id'])) {
        $result = "The category must be selected.";
    } else {
        $product->name = $_POST['name'];
        $product->price = $_POST['price'];
        $product->description = $_POST['description'];
        $product->category_id = $_POST['category_id'];
        $result = $product->create() ? "true" : 'false';
    }

    // create the product
    echo $result;
}