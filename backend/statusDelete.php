<?php
header('Access-Control-Allow-Origin: *');
require_once "permissionCheck.php";
require_once "responses.php";
getLoggedUserOrFail();
$data = file_get_contents('php://input');
$statuses = file_get_contents("statuses.json");
$newStatuses = [];


        $statuses = json_decode($statuses, true);
        $newStatus = json_decode($data, true);

            for($i = 0; $i < count($statuses); $i++){
                if($statuses[$i]["id"] !== $newStatus["id"]){

                   $newStatuses[] = $statuses[$i];
                }
            }

$jsonStatuses = json_encode($newStatuses);
file_put_contents("statuses.json", $jsonStatuses);
returnResponse("statuses", $newStatuses, true);
//        $response = [
//            "success" => true,
//            "statuses" => $newStatuses
//        ];

//        echo json_encode($response);






?>