<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

include_once("../connection/Connection.php");

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Decodificar los datos del request
    $request = json_decode($postdata);

    // Crear una instancia de la conexión
    $db = new Connection();

    // Sanitizar y capturar los datos
    $name = trim($request->nombre);
    $email = trim($request->email);
    $pwd = trim($request->pwd);

    // Verificar que no haya campos vacíos
    if (!empty($name) && !empty($email) && !empty($pwd)) {
        // Hashear la contraseña
        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        // Preparar la consulta
        $sql = "INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)";

        // Usar una consulta preparada
        if ($stmt = $db->prepare($sql)) {
            // Vincular los parámetros
            $stmt->bind_param('sss', $name, $hashedPwd, $email);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Obtener el ID del nuevo usuario
                $userId = $stmt->insert_id;

                // Preparar los datos de respuesta
                $authdata = [
                    'name' => $name,
                    'pwd' => '', // Nunca devolver la contraseña, ni siquiera encriptada
                    'email' => $email,
                    'id' => $userId
                ];

                // Devolver los datos en formato JSON
                echo json_encode($authdata);
            } else {
                // Error en la ejecución de la consulta
                http_response_code(500);
                echo json_encode(['message' => 'Error al registrar el usuario']);
            }
            $stmt->close();
        } else {
            // Error en la preparación de la consulta
            http_response_code(500);
            echo json_encode(['message' => 'Error en la consulta']);
        }
    } else {
        // Si algún campo está vacío
        http_response_code(400);
        echo json_encode(['message' => 'Todos los campos son obligatorios']);
    }

    // Cerrar la conexión
    $db->close();
}
