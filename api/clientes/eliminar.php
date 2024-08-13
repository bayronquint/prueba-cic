<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: DELETE");

require_once "../models/Cliente.php";

if (isset($_GET['idCliente'])) {
    if (Cliente::deleteCliente($_GET['idCliente'])) {
        echo json_encode(['deleteCliente' => true]);
    } else {
        echo json_encode(['deleteCliente' => false]);
    }
} else {
    echo json_encode(['deleteCliente' => false]);
}
