<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    file_put_contents("sensor_status.txt", "disabled");
    echo json_encode(["success" => true, "message" => "Sensors turned off"]);
}
?>
