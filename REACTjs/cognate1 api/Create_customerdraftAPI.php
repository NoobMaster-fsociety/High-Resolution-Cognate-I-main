<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';


    $item = new Database();


    $data = json_decode(file_get_contents("php://input"));
    
    if($data->Customer_name == "" || $data->Customer_email == "" 
    || $data->Customer_cell == "" || $data->Customer_address == "" 
    || $data->Customer_purchase== "" || $data->Customer_total == null
    || $data->Customer_payment == "" || $data->Customer_date == null
    || $data->Customer_Quantity== "")
    {
        echo json_encode(array(array('Result' => false)));
    }
    else{

     


       $date = str_replace('/', '-', $data->Customer_date);
    //    echo date('Y-m-d', strtotime($date));
        $item->Customer_name =  strtolower(str_replace(' ','+',$data->Customer_name));
        $item->Customer_email = $data->Customer_email;
        $item->Customer_cell = $data->Customer_cell;
        $item->Customer_address = $data->Customer_address;
        $item->Customer_purchase = $data->Customer_purchase;
        $item->Customer_date = date('Y-m-d', strtotime($date));
        $item->Customer_total = $data->Customer_total;
        $item->Customer_Quantity = $data->Customer_Quantity;
        $item->Customer_modepayment = $data->Customer_modepayment;
        $item->Customer_payment = $data->Customer_payment;
    

            echo json_encode(array(array('Result' => $item->C_reate_customerDataDraft(),'Message' => null)));

       
        
    }





   
    
  
   
?>