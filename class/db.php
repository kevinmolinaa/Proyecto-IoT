<?php 
    class Database {
        private $host = 'localhost';
        private $database_name = 'venta';
        private $username = 'kevin';
        private $password = 'kevin';
        public $conn;
        
        public function getConnection(){
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "No se pudo conectar a la base de datos: " . $exception->getMessage();
            }
            return $this->conn;
        }
    }  
?>
