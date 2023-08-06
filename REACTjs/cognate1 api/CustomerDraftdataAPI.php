<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';

    $item = new Database();

    $stmt = $item->getCustomerDataDraft(); //GET data from the query
    $itemCount = $stmt->rowCount(); //Get the row count

    if($itemCount > 0){
        
        $employeeArr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row); //Extract the data 
            $e = array(
                "Customer_ID" => intVal($Customer_ID), 
                "Customer_name" => strVal(str_replace('+',' ',$Customer_name)),  
                "Customer_email" => strVal($Customer_email),
                "Customer_cell" => strVal($Customer_cell),
                "Customer_address" => strVal($Customer_address),
                "Customer_purchase" => strVal($Customer_purchase),
                "Customer_date" => strVal($Customer_date),
                "Customer_total" => intVal($Customer_total),
                "Customer_Quantity" => strVal($Customer_Quantity),
                "Customer_modepayment" => strVal($Customer_modepayment),
                "Customer_payment" => strVal($Customer_payment),


            );
            array_push($employeeArr, $e);
        }
        echo json_encode($employeeArr);
    }
    else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }

?>