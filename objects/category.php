<?php
class Category{

    // database connection and table name
    private $conn;
    private $table_name = "categories";

    // object properties
    public $id;
    public $name;

    public function __construct($db){
        $this->conn = $db;
    }

    public function readAll(){

        //select all data
        $query = "SELECT id, name FROM categories ORDER BY name";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $categories=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($categories);
    }

}