# REACT CRUD
A simple CRUD application in React JS with PHP as the server-side language, and MySQL Database.

![alt tag](http://i63.tinypic.com/2vci87n.png)

This tutorial covers only the basic aspects of how to create a simple CRUD application using ReactJS, so you won't find 'how to use Redux' or other topics in this sample.

The included features are:
-  User Registration and Authentication
-  Server-side CRUD with grid, pagination, filtering, and sorting

## Installation
### 1. Clone the project or download the .zip file. Put it inside your local web root directory.
Since this project used PHP as the API, you could put the project inside your PHP web server root directory.

```sh
$ git clone https://github.com/andy1992/react-crud.git
```

### 2. Import the database from /database directory to your MySQL Database
Since the project used MySQL Database, you could find the exported database on the /database directory, and import it to your MySQL Database.

### 3. Setup config based on your environment in the config/database.php
Set the hostname, database name, username, and password based on your database configuration.

```php

class Database{
    private $host = "localhost";
    private $db_name = "react-crud";
    private $username = "root";
    private $password = "secret";
    public $conn;

    //...
}
```

### 4. Run the app on your browser.
