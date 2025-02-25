<?php
session_start();
if (!isset($_SESSION['user'])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

// Proceed with disabling the alarm
file_put_contents("sensor_status.txt", "disabled");
echo json_encode(["success" => true, "message" => "Alarm turned off"]);
?>
