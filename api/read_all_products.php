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

if(isset($_GET['order_by']))
    if(!empty($_GET['order_by']))
        $orderBy = $_GET['order_by'];

if(isset($_GET['order_type']))
    if(!empty($_GET['order_type']))
        $orderType = $_GET['order_type'];

if(isset($_GET['page']))
    if(!empty($_GET['page']))
        $currentPage = $_GET['page'];

if(isset($_GET['item_per_page']))
    if(!empty($_GET['item_per_page']))
        $limit = $_GET['item_per_page'];

// $results = $product->readAll();
$results = $product->paginate($where, $currentPage, $limit, $orderBy, $orderType);

// output in json format
echo $results;
