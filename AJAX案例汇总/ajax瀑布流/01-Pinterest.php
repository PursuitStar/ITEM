<?php
$message = [];
for($i = 0; $i < 10; $i++) {
    $height = rand(200, 400);
    $index = rand(1, 36);
    $message["$index"] = $height;
}
echo json_encode($message);