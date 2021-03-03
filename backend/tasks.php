<?php
header('Access-Control-Allow-Origin: *');
require_once "permissionCheck.php";
require_once "responses.php";
require_once "tasks_helper.php";
getLoggedUserOrFail();
$data = file_get_contents('php://input');
$tasks = getAllTasks();
if(empty($data)){
    returnResponse("tasks", $tasks, true);
}
else{
        $newTask = json_decode($data, true);
        if(isset($newTask["id"])){
//            try{
//                $tasks = updateTask($tasks, $newTask);
//            }catch(Exception $e){
//                file_put_contents("errors.log", $e->getMessage()."\n".$e->getTraceAsString()."\n", FILE_APPEND);
//                returnResponse("msg", "Nie udał się update taska", false);
//            }
            $tasks = updateTask($tasks, $newTask);
            file_put_contents("tasks.json", json_encode($tasks));
            returnResponse("msg", "Udał się update taska", true);
        }
        else{
            $newTask["id"] = count($tasks) + 1;
            $tasks[] = $newTask;
        }

        file_put_contents("tasks.json", json_encode($tasks));
        returnResponse("tasks", $tasks, true);
    }



?>