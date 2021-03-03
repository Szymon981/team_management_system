<?php

header('Access-Control-Allow-Origin: *');
require_once "responses.php";

$data = file_get_contents('php://input');
$users = file_get_contents("users.json");


$decodedUsers = json_decode($users, true);
$specifedData = [];
foreach($decodedUsers as $user){
    $specifedData[] = [
        "id" => $user["id"],
        "nick" => $user["nick"],
        "login" => $user["login"]
    ];
}

returnResponse("users", $specifedData, true);



?>