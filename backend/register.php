<?php
header('Access-Control-Allow-Origin: *');
$data = file_get_contents('php://input');

$users = file_get_contents("users.json");


        $users = json_decode($users, true);
        $newUser = json_decode($data, true);
        $newUser["password"] = sha1($newUser["password"]);
        if(isset($newUser["id"])){
            for($i = 0; $i < count($users); $i++){
                if($users[$i]["id"] === $newUser["id"]){
                    $users[$i] = $newUser;
                }
            }
        }
        else{
            $newUser["id"] = count($users) + 1;
            $newUser["token"] = md5(time() . $newUser["id"]);
            $users[] = $newUser;
        }
        file_put_contents("users.json", json_encode($users));

        echo json_encode($newUser);

die();



?>