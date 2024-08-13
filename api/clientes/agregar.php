<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");


require_once "../models/Cliente.php";

$datos = json_decode(file_get_contents('php://input'));
if ($datos != null) {
    if (Cliente::insertCliente($datos->nombre, $datos->edad, $datos->fecha, $datos->genero)) {
        echo json_encode(['insertCliente' => true]);
    } else {
        echo json_encode(['insertCliente' => false]);
    }
} else {
    echo json_encode(['insertCliente' => false]);
}
