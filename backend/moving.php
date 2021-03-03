<?php
header('Access-Control-Allow-Origin: *');
require_once "responses.php";
require_once "permissionCheck.php";
require_once "positions.php";
$user = getLoggedUserOrFail();

$post = json_decode(file_get_contents('php://input'), true);
$id = $post["id"];
$direction = $post["direction"];
$tasks = json_decode(file_get_contents("tasks.json"), true);
$task = '';
for($i = 0; $i < count($tasks); $i++){
    if($tasks[$i]["id"] === $id){

        $task = $tasks[$i];
    }
}

if($direction === "down"){
    $result = moveDown($tasks, $task);
}
else{
    $result = moveUp($tasks, $task);
}
$result = $tasks;
file_put_contents("tasks.json", json_encode($result));
returnResponse("tasks", $result, true);

