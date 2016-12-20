<?php
class Product{

    // database connection and table name
    private $conn;
    private $table_name = "products";

    // object properties
    public $id;
    public $name;
    public $price;
    public $description;
    public $category_id;
    public $timestamp;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{

            // insert query
            $query = "INSERT INTO products
                SET name=:name, description=:description, price=:price, category_id=:category_id, created=:created";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $name=htmlspecialchars(strip_tags($this->name));
            $description=htmlspecialchars(strip_tags($this->description));
            $price=htmlspecialchars(strip_tags($this->price));
            $category_id=htmlspecialchars(strip_tags($this->category_id));

            // bind the parameters
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':category_id', $category_id);

            // we need the created variable to know when the record was created
            // also, to comply with strict standards: only variables should be passed by reference
            $created=date('Y-m-d H:i:s');
            $stmt->bindParam(':created', $created);

            // Execute the query
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

        }

            // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function paginate($where = '', $page = 1, $limit = 10, $orderBy = 'p.name', $orderType = 'asc') {
        $query = "SELECT p.id, p.name, p.description, p.price, p.category_id, c.name as category_name
              FROM ". $this->table_name ." p LEFT JOIN categories c ON p.category_id = c.id
              WHERE p.name LIKE :where
              ORDER BY " . $orderBy . " " . $orderType . "
              LIMIT ". ($page - 1) * $limit ."," . $limit . "
              ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

    public function count($where = '') {
        $query = "SELECT p.id
              FROM ". $this->table_name ." p LEFT JOIN categories c ON p.category_id = c.id
              WHERE p.name LIKE :where
              ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return count($products);
    }

    public function readAll(){

        //select all data
        $query = "SELECT p.id, p.name, p.description, p.price, p.category_id, c.name as category_name
              FROM ". $this->table_name ." p LEFT JOIN categories c ON p.category_id = c.id ORDER BY name";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.name, p.description, p.price, p.category_id, c.name as category_name
                    FROM " . $this->table_name . " p LEFT JOIN categories c ON p.category_id=c.id
                    WHERE p.id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function update(){

        $query = "UPDATE products
                SET name=:name, description=:description, price=:price, category_id=:category_id
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $name=htmlspecialchars(strip_tags($this->name));
        $description=htmlspecialchars(strip_tags($this->description));
        $price=htmlspecialchars(strip_tags($this->price));
        $category_id=htmlspecialchars(strip_tags($this->category_id));
        $id=htmlspecialchars(strip_tags($this->id));

        // bind the parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    // delete selected products
    public function delete($ins){

        // query to delete multiple records
        //$query = "DELETE FROM products WHERE id IN (:ins)";

        // sanitize
        $ins=htmlspecialchars(strip_tags($ins));

        // bind the parameter
        //$stmt->bindParam(':ins', $ins);
        $query = "DELETE FROM products WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}