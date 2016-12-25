<?php
class User{

    // database connection and table name
    private $conn;
    private $table_name = "users";

    // object properties
    public $id;
    public $email;
    public $password;
    public $created_at;

    public function __construct($db){
        $this->conn = $db;
    }

    public function auth() {
        try {
            $query = "SELECT id, email, created_at, password
                FROM " . $this->table_name . "
                WHERE email = :email";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            $email=htmlspecialchars(strip_tags($this->email));
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = null;
            $results=$stmt->fetchAll(PDO::FETCH_OBJ);
            if(count($results) > 0) {
                $result = $results[0];
                if(password_verify($this->password, $result->password)) {
                    session_start();
                    $user = $result;
                    $_SESSION['id'] = $user->id;
                    $_SESSION['email'] = $user->email;
                }
            }

            return $user;
        } catch(PDOException $exception) {
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function create(){
        try{

            $query = "SELECT id
                FROM " . $this->table_name . "
                WHERE email = :email";

            //prepare query for execution
            $stmt = $this->conn->prepare($query);

            $email=htmlspecialchars(strip_tags($this->email));
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = null;
            $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($results) > 0) {
                return 'Your email has been registered. Please pick another email.';
            } else {
                // insert query
                $query = "INSERT INTO users
                    SET email=:email, password=:password, created_at=:created";

                // prepare query for execution
                $stmt = $this->conn->prepare($query);

                // sanitize
                $email=htmlspecialchars(strip_tags($this->email));
                $password=htmlspecialchars(strip_tags($this->password));
                $salted_password = password_hash($password, PASSWORD_BCRYPT);

                // bind the parameters
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $salted_password);

                // we need the created variable to know when the record was created
                // also, to comply with strict standards: only variables should be passed by reference
                $created=date('Y-m-d H:i:s');
                $stmt->bindParam(':created', $created);

                // Execute the query
                if($stmt->execute()){
                    return 'true';
                }else{
                    return 'false';
                }
            }
        }
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function paginate($where = '', $page = 1, $limit = 10, $orderBy = 'created_at', $orderType = 'desc') {
        $query = "SELECT id, email, created_at
              FROM ". $this->table_name ."
              WHERE email LIKE :where
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
              FROM ". $this->table_name ." p
              WHERE p.email LIKE :where
              ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':where', $where);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return count($products);
    }

    public function readAll(){

        //select all data
        $query = "SELECT p.id, p.email, p.created_at
              FROM ". $this->table_name ." p ORDER BY created_at";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($products);
    }

    public function readOne(){

        // select one record
        $query = "SELECT id, email, created_at
                    FROM " . $this->table_name . "
                    WHERE id=:id";

        //prepare query for execution
        $stmt = $this->conn->prepare($query);

        $id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function update(){

        $query = "UPDATE users
                SET password=:password
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $password=htmlspecialchars(strip_tags($this->password));

        // bind the parameters
        $stmt->bindParam(':password', $password);

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
        $query = "DELETE FROM users WHERE id IN ($ins)";
        //return $query;
        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}