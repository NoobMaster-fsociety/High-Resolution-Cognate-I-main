<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));
    if ($data->Product_name == "" || $data->Product_category == ""
        || $data->Product_stocks == null || $data->Product_price == null)
    {
        echo json_encode(array(array('Result' => false)));
    }
    else{
        
    $item->Product_ID = $data->Product_ID;
    $item->Product_image = $data->Product_image;
    $item->Product_name = strtolower(str_replace(' ','+',$data->Product_name));
    $item->Product_category = $data->Product_category;
    $item->Product_stocks = $data->Product_stocks;
    $item->Product_price = $data->Product_price;
    $item->Product_Status = $data->Product_Status;
    
    echo json_encode(array(array('Result' => $item->update_productdata())));
 
    if ($item->category_Authentication($data->Product_category))
    {
        $item->insert_category($data->Product_category);
    }
   
    }
  
   
?>