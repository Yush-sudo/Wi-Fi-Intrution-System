<?php
session_start();
require 'config.php'; // Store user credentials securely

$users = [
    'admin' => password_hash('password123', PASSWORD_DEFAULT) // Replace with a database or secure storage
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (isset($users[$username]) && password_verify($password, $users[$username])) {
        session_regenerate_id(true); // Prevent session fixation
        $_SESSION['user'] = $username;
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_SESSION['user'])) {
    echo json_encode(["loggedIn" => true, "user" => $_SESSION['user']]);
} else {
    echo json_encode(["loggedIn" => false]);
}
?>
