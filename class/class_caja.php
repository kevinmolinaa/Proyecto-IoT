<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once 'db.php';

class caja_class extends Database {
    private $table_name = "caja";

    public function __construct(){
        $this->conn = $this->getConnection();
    }

    public function getAllUsers()
    {
        $stmt = $this->conn->prepare("
            SELECT
                `caja`.`id` as 'id',
                `caja`.`cliente` as 'cliente',
                `caja`.`producto` as 'producto',
                `caja`.`ubicacion` as 'ubicacion',
                `caja`.`precio` as 'precio',
                `caja`.`fecha` as 'fecha'
            FROM `caja`
            ORDER BY `caja`.`id` ASC
        ");
        if ($stmt->execute()) {
            $result = array();
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'id' => $row['id'],
                        'cliente' => $row['cliente'],
                        'producto' => $row['producto'],
                        'ubicacion' => $row['ubicacion'],
                        'precio' => $row['precio'],
                        'fecha' => $row['fecha']
                    );
                    array_push($result, $item);
                }
            }
            return $result;
        } else {
            return false;
        }
    }


    public function getUser($id, $cliente)
    {
        $where_clause = '';

        if (isset($id)) {
            $where_clause .= " WHERE `caja`.`id` = $id";
        }

        if (isset($cliente)) {
            if (!empty($where_clause)) {
                $where_clause .= " AND";
            } else {
                $where_clause .= " WHERE";
            }
            $where_clause .= " `caja`.`cliente` = '$cliente'";
        }

        $stmt = $this->conn->prepare("
            SELECT
                `caja`.`id` as 'id',
                `caja`.`cliente` as 'cliente',
                `caja`.`producto` as 'producto',
                `caja`.`ubicacion` as 'ubicacion',
                `caja`.`precio` as 'precio',
                `caja`.`fecha` as 'fecha'
            FROM `caja`
            $where_clause
            ORDER BY `caja`.`id` ASC
        ");
        if ($stmt->execute()) {
            $result = array();
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'id' => $row['id'],
                        'cliente' => $row['cliente'],
                        'producto' => $row['producto'],
                        'ubicacion' => $row['ubicacion'],
                        'precio' => $row['precio'],
                        'fecha' => $row['fecha']
                    );
                    array_push($result, $item);
                }
            }
            return $result;
        } else {
            return false;
        }
    }

    public function insertUser($cliente, $producto, $ubicacion, $precio, $fecha)
    {                  
        $stmt = $this->conn->prepare("INSERT INTO `caja` (`id`, `cliente`, `producto`, `ubicacion`, `precio`, `fecha`) 
            VALUES (NULL, :cliente, :producto, :ubicacion, :precio, :fecha);");
        $stmt->bindValue('cliente', $cliente);
        $stmt->bindValue('producto', $producto);
        $stmt->bindValue('ubicacion', $ubicacion);
        $stmt->bindValue('precio', $precio);
        $stmt->bindValue('fecha', $fecha);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateUser($id, $cliente, $producto, $ubicacion, $precio, $fecha)
    { 
        $stmt = $this->conn->prepare("
            UPDATE `caja` SET 
            `cliente` = :cliente, 
            `producto` = :producto, 
            `ubicacion` = :ubicacion, 
            `precio` = :precio, 
            `fecha` = :fecha 
            WHERE `caja`.`id` = :id
        ");

        $stmt->bindValue('id', $id);
        $stmt->bindValue('cliente', $cliente);
        $stmt->bindValue('producto', $producto);
        $stmt->bindValue('ubicacion', $ubicacion);
        $stmt->bindValue('precio', $precio);
        $stmt->bindValue('fecha', $fecha);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteUser($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM `caja` WHERE `caja`.`id` = :id");
        if ($stmt->execute(array(':id' => $id))) {
            return true;
        } else {
            return false;
        }         
    }
}
?>
