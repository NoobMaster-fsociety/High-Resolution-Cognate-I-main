<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));
    


    
    $item->Customer_ID = $data->Customer_ID;

    $item->retrieve_customerdata(); //Retrieve Customer
    $item->delete_customerdata(); //Delete customer


    echo json_encode(array(array('Result' => $item-> create_customerDataDraft()))); //Create draft
    

       
  


   
    
  
   
?>