<?php
header('Access-Control-Allow-Origin: *');
require_once "responses.php";
require_once "permissionCheck.php";
$user = getLoggedUserOrFail();




returnResponse("user", $user, true);



//
//$response = [
//    "success" => true,
//    "user" => $user
//];
//
//echo json_encode($response);






?>