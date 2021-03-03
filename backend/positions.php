<?php
require_once "tasks_helper.php";

function getMaxPositionInStatus($status){
    $tasks = getAllTasks();
    $counter = 0;
    for($i = 0; $i < count($tasks); $i++){
        if($tasks[$i]["status"] === $status && $tasks[$i]["position"] > $counter){
            $counter = $tasks[$i]["position"];
        }
    }
    return $counter;
}

function getTaskByPositionIndexAndStatus($tasks, $status, $positionIndex){
    $tasksInStatus = array_filter($tasks, function ($task) use ($status){
        return $task["status"] === $status;
    });
    usort($tasksInStatus, "compareTasksPositions");
    return $tasksInStatus[$positionIndex];
}

function getPositionIndexByPosition($tasks, $status, $position){
    $tasksInStatus = array_filter($tasks, function ($task) use ($status){
        return $task["status"] === $status;
    });
    $positions = array_column($tasksInStatus, "position");
    sort($positions);
    return array_search($position, $positions);

}

function moveUp($tasks, $task){
    if($task["position"] === 0){
        return $tasks;
    }
    return moveTask($tasks, $task, -1);
}

function moveDown($tasks, $task){
    $maxPosition = getMaxPositionInStatus($task["status"]);
    if($task["position"] >= $maxPosition){
        return $tasks;
    }
    return moveTask($tasks, $task, 1);
}

function moveToEndTasklist($tasks, $id, $newTaskListId){

}

function getTaskIndex($tasks, $task){
    for($i = 0; $i < count($tasks); $i++){
        if($tasks[$i]["id"] === $task["id"]){
            return $i;
        }
    }
    return null;
}

function moveTask($tasks, $task, $move){
    $positionIndex = getPositionIndexByPosition($tasks, $task["status"], $task["position"]);
    $otherTask = getTaskByPositionIndexAndStatus($tasks, $task["status"], $positionIndex + $move);
    $newPosition = $otherTask["position"];
    $otherTask["position"] = $task["position"];
    $task["position"] = $newPosition;
    $tasks[getTaskIndex($tasks, $task)] = $task;
    $tasks[getTaskIndex($tasks, $otherTask)] = $otherTask;
//    var_dump($tasks);
//    die();

    return $tasks;
}

function compareTasksPositions($a, $b) {
    return $a['position'] > $b['position'];
}

