<?php

function returnResponse($msgName, $msg, $success){
    $response = [
        $msgName => $msg,
        "success" => $success

    ];
    echo json_encode($response);
    die();
}