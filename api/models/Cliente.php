<?php

require_once "../connection/Connection.php";

class Cliente
{

    public static function getAll()
    {
        $db = new Connection();
        $query = "SELECT * FROM clientes";
        $resultado = $db->query($query);
        $datos = [];
        if ($resultado->num_rows) {
            while ($row = $resultado->fetch_assoc()) {
                $datos[] = [
                    'idCliente' => $row['idCliente'],
                    'nombre' => $row['nombre'],
                    'edad' => $row['edad'],
                    'fecha' => $row['fecha'],
                    'genero' => $row['genero']
                ];
            }
            return $datos;
        }
    }

    public static function getWhere($idCliente)
    {
        $db = new Connection();
        $query = "SELECT * FROM clientes WHERE idCliente = $idCliente";
        $resultado = $db->query($query);
        $datos = [];
        if ($resultado->num_rows) {
            while ($row = $resultado->fetch_assoc()) {
                $datos[] = [
                    'idCliente' => $row['idCliente'],
                    'nombre' => $row['nombre'],
                    'edad' => $row['edad'],
                    'fecha' => $row['fecha'],
                    'genero' => $row['genero']
                ];
            }
            return $datos;
        }
    }

    public static function insertCliente($nombre, $edad, $fecha, $genero)
    {
        $db = new Connection();
        $query = "INSERT INTO clientes(nombre, edad, fecha, genero) VALUES ('" . $nombre . "', " . $edad . ", '" . $fecha . "', '" . $genero . "')";
        $db->query($query);

        if ($db->affected_rows) {
            return true;
        } else {
            return false;
        }
    }

    public static function updateCliente($idCliente, $nombre, $edad, $fecha, $genero)
    {
        $db = new Connection();
        $query = "UPDATE clientes SET nombre = '" . $nombre . "', edad = " . $edad . ", fecha = '" . $fecha . "', genero = '" . $genero . "' WHERE idCliente = $idCliente";
        $db->query($query);

        if ($db->affected_rows) {
            return true;
        } else {
            return false;
        }
    }

    public static function deleteCliente($idCliente)
    {
        $db = new Connection();
        $query = "DELETE FROM clientes WHERE idCliente = $idCliente";
        $db->query($query);

        if ($db->affected_rows >= 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}
