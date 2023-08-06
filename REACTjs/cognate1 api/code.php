<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));
    

   // $item->email = $data->email;
    // $item->code = base64_encode($data->code);
    $item->code = $data->code;
    echo json_encode(array(array('Result' => $item->Code_Authentication(),"MESSAGE" =>"TAMA ANG CODE MO BOBO")));

   
    
  
   
?>