<?php
header('Access-Control-Allow-Origin: *');
require_once "permissionCheck.php";
require_once "responses.php";
getLoggedUserOrFail();
$data = file_get_contents('php://input');
$statuses = file_get_contents("statuses.json");


if(empty($data)){
    $decodedStatuses = json_decode($statuses, true);
    returnResponse("statuses", $decodedStatuses, true);
//    $response = [
//        "success"=> true,
//        "statuses"=> $decodedStatuses
//    ];
//    echo json_encode($response);

}
else{
    $statuses = json_decode($statuses, true);
    $newStatus = json_decode($data, true);
    $newStatus['id'] = count($statuses) + 1;
    $statuses[] = $newStatus;
    file_put_contents("statuses.json", json_encode($statuses));
    returnResponse("statuses", $statuses, true);
//    $response = [
//        "success" => true,
//        "statuses" => $statuses
//    ];
//    $jsonResponse = json_encode($response);
//    echo $jsonResponse;
}





?>