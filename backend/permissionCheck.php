<?php

function forbiddenAction(){
    $tokenResponse = [
                     "success" => false,
                     "msg" => "Nie masz dostępu"
                ];
        echo json_encode($tokenResponse);
        die();
}


function getLoggedUserOrFail(){
    $data = file_get_contents('php://input');
    if(!isset($_GET["token"])){
        forbiddenAction();
    }

    $token = $_GET['token'];
    $users = file_get_contents("users.json");
    $decodedUsers = json_decode($users, true);
    $loggedUser = null;

    for($i = 0; $i < count($decodedUsers); $i++){
        if($decodedUsers[$i]["token"] === $token){
            $loggedUser = $decodedUsers[$i];
            break;
        }
    }
    if($loggedUser === null){
        forbiddenAction();
    }

    return $loggedUser;
}


?>