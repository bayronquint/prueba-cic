<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

include_once("../connection/Connection.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    // Crear una instancia de la conexión
    $db = new Connection();

    // Obtener los datos del request
    $email = trim($request->email);
    $pwd = trim($request->password);

    // Preparar la consulta SQL con placeholders
    $sql = "SELECT * FROM usuarios WHERE email = ?";

    // Usar una consulta preparada
    if ($stmt = $db->prepare($sql)) {
        // Vincular parámetros y ejecutar la consulta
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        // Verificar si se encontraron filas
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Verificar la contraseña usando password_verify()
            if (password_verify($pwd, $user['password'])) {
                // Retornar los datos del usuario en formato JSON
                echo json_encode($user);
            } else {
                http_response_code(401); // Error de autenticación
                echo json_encode(['message' => 'Contraseña incorrecta']);
            }
        } else {
            http_response_code(404); // Usuario no encontrado
            echo json_encode(['message' => 'Usuario no encontrado']);
        }
        $stmt->close();
    } else {
        http_response_code(500); // Error interno del servidor
        echo json_encode(['message' => 'Error en la consulta']);
    }

    $db->close();
}
