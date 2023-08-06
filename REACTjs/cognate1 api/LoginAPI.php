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
    $item->email = base64_encode($data->email);
    $item->password = base64_encode($data->password);
    $item->sec1 = base64_encode($data->sec1);
    $item->sec2 = base64_encode($data->sec2);
    if ($item->email == null && $item->password == null)
    {
        echo json_encode(array(array('Result' =>$item->Security_Authentication() )));

    }else{
        echo json_encode(array(array('Result' => $item->Login_Authentication())));
    }

          // echo json_encode($asd);

   
    
  
   
?>