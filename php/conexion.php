<?php
class conexion
{
    private $conn;
    public function __construct() {
        $servidor = "localhost";
        $usuario = "argenis";
        $clave = "100%Samaniego";
        $base_datos = "task_manager";
        try {
            // Crear la conexión utilizando PDO
            $conexion = new PDO("mysql:host=$servidor;dbname=$base_datos", $usuario, $clave);
            
            // Configurar el manejo de errores a través de excepciones
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $this->Conectar($conexion);

        } catch (PDOException $e) {
            // Si ocurre un error, se captura en la excepción
            echo "Conexión fallida: " . $e->getMessage();
        }
        
    }

    public function Conectar(PDO $conexion) : void {
        $this->conn=$conexion;
    }

    public function selectall($sql){
        $consulta = $this->conn->prepare($sql);
        $consulta->execute();
        $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }

    public function select($sql){
        $consulta = $this->conn->prepare($sql);
        $consulta->execute();
        $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        return $resultado;
    }

    public function update($sql,$valores){
        try{
            // Preparar la sentencia SQL (con placeholders `?`)
            $consulta = $this->conn->prepare($sql);

            // Ejecutar la consulta pasando el array de valores
            $resultado = $consulta->execute($valores);

            // Verificar si la consulta fue exitosa
            if ($resultado) {
                return $consulta->rowCount(); // Retorna el número de filas afectadas
            } else {
                return 0; // No se actualizó ninguna fila
            }
        }catch(PDOException $e){
            echo "Error en la actualización: " . $e->getMessage();
            return -1;
        }
    }

    public function insert($sql,$valores) {
        try {
            // Preparar la sentencia SQL (con placeholders `?`)
            $consulta = $this->conn->prepare($sql);

            // Ejecutar la consulta pasando el array de valores
            $resultado = $consulta->execute($valores);

            // Verificar si la consulta fue exitosa
            if ($resultado) {
                return $this->conn->lastInsertId(); // Retorna el ID del último registro insertado
            } else {
                return 0; // No se insertó ningún registro
            }
        } catch (PDOException $e) {
            echo "Error en la inserción: " . $e->getMessage();
            return -1;
        }
    }

    public function closeCNN() : void {
        $this->conn=null;
    }
}
