<?php
// Configurar encabezados CORS
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400'); // Cache de preflight

// Manejar solicitudes de preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once("../connection/Connection.php");

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Decodificar los datos del request
    $request = json_decode($postdata);

    // Crear una instancia de la conexión
    $db = new Connection();

    // Verificar la conexión
    if ($db->connect_error) {
        http_response_code(500);
        echo json_encode(['message' => 'Error de conexión: ' . $db->connect_error]);
        exit();
    }

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

        // Depuración: Verificar si se puede preparar la consulta
        if (!$stmt = $db->prepare($sql)) {
            http_response_code(500);
            echo json_encode(['message' => 'Error en la preparación de la consulta: ' . $db->error]);
            exit();
        }

        // Vincular los parámetros
        if (!$stmt->bind_param('sss', $name, $hashedPwd, $email)) {
            http_response_code(500);
            echo json_encode(['message' => 'Error al vincular parámetros: ' . $stmt->error]);
            exit();
        }

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
            echo json_encode(['message' => 'Error al ejecutar la consulta: ' . $stmt->error]);
        }

        // Cerrar el statement
        $stmt->close();
    } else {
        // Si algún campo está vacío
        http_response_code(400);
        echo json_encode(['message' => 'Todos los campos son obligatorios']);
    }

    // Cerrar la conexión
    $db->close();
} else {
    http_response_code(400);
    echo json_encode(['message' => 'No se recibieron datos']);
}
