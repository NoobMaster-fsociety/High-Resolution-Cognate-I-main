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
    
   
 
    if ($item->retrieve_Archiveproductdata()){
        
        $item->create_productdata();
        echo json_encode(array(array('Result' => $item->delete_Archiveproductdata())));
    }else{
        echo json_encode(array(array('Result' => "hindi gumana")));
    }

    if ($item->category_Authentication($data->Product_category))
    {
        $item->insert_category($data->Product_category);
    }
   

    // echo json_encode(array(array('Result' => $item->delete_productdata())));


   
    
  
   
?>