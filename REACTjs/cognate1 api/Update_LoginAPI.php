<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));
    if ($data->email == "" || $data->password == "" || $data->sec1 == "" || $data->sec2 == ""){

        echo json_encode(array(array('Result' => false)));
    }
    else
    {

        $item->email = base64_encode($data->email);
        $item->password = base64_encode($data->password);
        $item->sec1 = base64_encode($data->sec1);
        $item->sec2 = base64_encode($data->sec2);
        echo json_encode(array(array('Result' => $item->updateLogin())));
    }

 


   
    
  
   
?>