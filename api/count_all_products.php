<?php
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

$where = '%%';
$orderBy = 'p.name';
$orderType = 'asc';
$limit = 5;
$currentPage = 1;

if(isset($_GET['name']))
    if(!empty($_GET['name']))
        $where = '%' . $_GET['name'] . '%';

// $results = $product->readAll();
$results = $product->count($where);

// output in json format
echo $results;