<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: PUT");

require_once "../models/Cliente.php";

$datos = json_decode(file_get_contents('php://input'));
if ($datos != null) {
    if (Cliente::updateCliente($datos->idCliente, $datos->nombre, $datos->edad, $datos->fecha, $datos->genero)) {
        echo json_encode(['updateCliente' => true]);
    } else {
        echo json_encode(['updateCliente' => false]);
    }
} else {
    echo json_encode(['updateCliente' => false]);
}
