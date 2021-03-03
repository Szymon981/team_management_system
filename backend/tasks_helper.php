<?php
header('Access-Control-Allow-Origin: *');
require_once "permissionCheck.php";

function getAllTasks(){
    $tasks = file_get_contents("tasks.json");
    $decodedTasks = json_decode($tasks, true);
    return $decodedTasks;
}

function getTaskById($id){
    $tasks = getAllTasks();
    for($i = 0; $i < count($tasks); $i++){
        if($tasks[$i]["id"] === $id){
            return $tasks[$i];
        }
    }
    throw new Exception("Task nie istnieje task o id:".$id);
}

function updateTask($tasks, $updatedTask){
    for($i = 0; $i < count($tasks); $i++){
        if($tasks[$i]["id"] === $updatedTask["id"]){
            if($tasks[$i]["position"] === $updatedTask["position"]){

            }

            $tasks[$i] = $updatedTask;
            return $tasks;
        }
    }
//    throw new Exception("Task nie istnieje".$updatedTask["id"]);
}