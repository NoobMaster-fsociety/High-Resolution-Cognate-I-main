﻿<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';
   $item = new Database();


    $data = json_decode(file_get_contents("php://output"));
    $str =$item->getpercentsales();
  

    if($str > 0)
           // echo json_encode($asd);
    echo json_encode($str, JSON_NUMERIC_CHECK);


    else {
        echo json_encode("0",JSON_NUMERIC_CHECK
        );
}

   
    
  









 ?>