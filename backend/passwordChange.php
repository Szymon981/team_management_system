<?php
header('Access-Control-Allow-Origin: *');
require_once "permissionCheck.php";
require_once "responses.php";

$data = file_get_contents('php://input');
$data = json_decode($data, true);
$users = file_get_contents("users.json");
$decodedUsers = json_decode($users, true);
$success = false;
if(empty($data)){

}
else{
    $loggedUser = getLoggedUserOrFail();
    if($loggedUser["password"] === sha1($data["oldPassword"])){
        for($i = 0; $i < count($decodedUsers); $i++){
            if((int)$decodedUsers[$i]["id"] === (int)$loggedUser["id"]){
                $decodedUsers[$i]["password"] = sha1($data["newPassword"]);
                $success = true;
                $response = [
                    "success" => true,
                    "msg" => "Udana zmiana hasła"
                ];
                $updatedUsers = json_encode($decodedUsers);
                file_put_contents("users.json", $updatedUsers);
            }
        }
    }

}
if(!$success){
    $response = [
        "success" => false,
        "msg" => "Stare hasło jest niepoprawne"
    ];
}

$response = json_encode($response);
echo $response;
die();

//encodeAndDie("msg", "Stare hasło jest niepoprawne", false);

?>





