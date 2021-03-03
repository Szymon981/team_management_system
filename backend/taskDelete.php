<?php
header('Access-Control-Allow-Origin: *');
require_once "permissionCheck.php";
require_once "responses.php";
getLoggedUserOrFail();
$data = file_get_contents('php://input');
$tasks = file_get_contents("tasks.json");
$newTasks = [];


        $tasks = json_decode($tasks, true);
        $newTask = json_decode($data, true);

            for($i = 0; $i < count($tasks); $i++){
                if($tasks[$i]["id"] !== $newTask["id"]){

                   $newTasks[] = $tasks[$i];
                }
            }
            $jsonTasks = json_encode($newTasks);
        file_put_contents("tasks.json", $jsonTasks);
        returnResponse("tasks", $newTasks, true);
//        $response = [
//            "success" => true,
//            "tasks" => $newTasks
//        ];
//
//        echo json_encode($response);



?>