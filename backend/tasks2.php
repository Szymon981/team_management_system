<?php
header('Access-Control-Allow-Origin: *');
$data = file_get_contents('php://input');

$tasks = file_get_contents("tasks.json");
if(empty($data)){
    $decodedTasks = json_decode($tasks, true);
    $response = [
        "success"=> true,
        "tasks"=> $decodedTasks
    ];
    echo json_encode($response);
    die();
}
else{
        $tasks = json_decode($tasks, true);
        $newTask = json_decode($data, true);
        if(isset($newTask["id"])){
            for($i = 0; $i < count($tasks); $i++){
                if($tasks[$i]["id"] === $newTask["id"]){
                    $tasks[$i] = $newTask;
                }
            }
        }
        else{
            $newTask["id"] = count($tasks) + 1;
            $tasks[] = $newTask;
        }
        $jsonTasks = json_encode($tasks);
        //file_put_contents("tasks.json", $jsonTasks);
        //echo $jsonTasks;


    }
die();


?>