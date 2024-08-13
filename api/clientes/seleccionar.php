<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

require_once "../models/Cliente.php";

if (isset($_GET['idCliente'])) {
    echo json_encode(Cliente::getWhere($_GET['idCliente']));
} else {
    echo json_encode(Cliente::getAll());
}
