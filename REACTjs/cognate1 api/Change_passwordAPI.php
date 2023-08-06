<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));


if ($data->password == $data->pass1){
    $item->password = base64_encode($data->password);
    if ($item->updatePassword()){
        echo json_encode(array(array('Result' => true, 'Message' => 'Sucessfully updated!'))); 
    }else{
        echo json_encode(array(array('Result' => false, 'Message' => 'Unable to update your password')));
    }
}else{
    echo json_encode(array(array('Result' => false, 'Message' => 'Password does not match')));
}




 


   
    
  
   
?>