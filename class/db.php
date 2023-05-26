<?php 
    $mqtt_secret = "";
    class Database {
        private $host = '34.141.155.221';
        private $database_name = 'Venta';
        private $username = 'kevin';
        private $password = 'kevin';
        public $conn;
        
        public function getConnection(){
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
                echo "Conexion Exitosa";
            }catch(PDOException $exception){
                echo "No se pudo conectar a la base de datos: " . $exception->getMessage();
            }
            return $this->conn;
        }
    }  
?>
