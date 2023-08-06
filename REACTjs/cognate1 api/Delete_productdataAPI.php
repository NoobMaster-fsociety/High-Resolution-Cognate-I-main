<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));

    $item->Product_ID = $data->Product_ID;
    
   
 
    if ($item->retrieve_productdata()){
        
        $item->create_Archiveproductdata();
        echo json_encode(array(array('Result' => $item->delete_productdata())));
    }else{
        echo json_encode(array(array('Result' => "hindi gumana")));
    }

  
   
?>