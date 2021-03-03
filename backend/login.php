<?php
require_once "responses.php";
header('Access-Control-Allow-Origin: *');
$data = file_get_contents('php://input');

$users = file_get_contents("users.json");
$users = json_decode($users, true);
$user = json_decode($data, true);
for($i = 0; $i < count($users); ++$i){
    if($users[$i]["login"] === $user["login"] && $users[$i]["password"] === sha1($user["password"])){
        $response = [
            "msg"=> "Logowanie udane",
            "success" => true,
            "token" => $users[$i]["token"]
        ];
        echo json_encode($response);

        die();
    }
    else{

    }
}
// $response = [
//            "msg"=> "Błędne logowanie",
//            "success" => false
//
//        ];
// echo json_encode($response);
//        die();
returnResponse("msg", "Błędne logowanie", false);




?>