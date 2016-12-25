##REACT CRUD
A simple CRUD application in React JS with PHP as the server-side language, and MySQL Database.

This tutorial covers only the basic aspects of how to create a simple CRUD application using ReactJS, so you won't find 'how to use Redux' or
 other topics in this sample.

##Installation
####1. Clone the project or download the .zip file. Put it inside your local web root directory.

```sh
$ git clone https://github.com/andy1992/react-crud.git
```

####2. Import the database from /database directory to your MySQL Database

####3. Setup config based on your environment on the config/database.php

```sh

class Database{
    private $host = "localhost";
    private $db_name = "react-crud";
    private $username = "root";
    private $password = "secret";
    public $conn;

    ...
}
```

####4. Run the app on your browser.