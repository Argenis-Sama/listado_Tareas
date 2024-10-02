<?php
include "conexion.php";
header("Access-Control-Allow-Origin: *"); // Permite cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$base= new conexion;
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$tipo=$data["accion"];
$repuesta=[];
switch ($tipo) {
    case 'c':
        $valores=array($data["titulo"],$data["descripcion"],$data["estado"]);
        $sql="INSERT INTO tasks (title,description,status) VALUES(?,?,?)";
        $repuesta= $base->insert($sql,$valores);
        break;
    case 'r':
        $sql = "SELECT * FROM tasks WHERE status <> 3;";
        $getdatas = $base->selectall($sql);

        for ($i = 0; $i < count($getdatas); $i++) {
            // Crear un nuevo array para cada tarea
            $arrdata = [];
            $arrdata["id"] = $getdatas[$i]["id"];
            $arrdata["title"] = $getdatas[$i]["title"];
            $arrdata["description"] = $getdatas[$i]["description"];
            $arrdata["status"] = $getdatas[$i]["status"] == 1 ? "Completo" : "Incompleto"; // Asegúrate de usar la columna correcta aquí
            $arrdata["estado"]=$getdatas[$i]["status"];
            $arrdata["fecha"] = date('Y-m-d', strtotime($getdatas[$i]["created_at"]));
            $arrdata["acciones"] = array(); // Agrega la lógica para las acciones que desees

            // Agregar el array a la respuesta
            $repuesta[] = $arrdata;
        }
        
        break;
    case 'u':
        $valores=array($data["titulo"],$data["descripcion"],$data["estado"]);
        $id=$data["id"];
        $sql="UPDATE tasks SET title=?,description=?,status=?,updated_at=current_timestamp() WHERE id=$id;";
        $repuesta= $base->update($sql,$valores);
        break;
    case 'd':
        $id=$data["id"];
        $sql="UPDATE tasks SET status=3,updated_at=current_timestamp() WHERE id=$id;";
        $repuesta= $base->select($sql);
        break;
    case 't':
        $id=$data["id"];
        $sql="SELECT title,description,status FROM tasks WHERE id=$id;";
        $repuesta=$base->select($sql);
        break;
    case 'uf':
        $valores=array($data["estado"]);
        $id=$data["id"];
        $sql="UPDATE tasks SET status=?,updated_at=current_timestamp() WHERE id=$id;";
        $repuesta= $base->update($sql,$valores);
        break;
    default:
        $repuesta=array("id"=>0,"title"=>"Fallo","description"=>"algo esta mal","status"=>"false","created_at"=>"hoy");
        break;
}

echo json_encode(array("datos"=>$repuesta,"estado"=>TRUE));