<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';

    $item = new Database();

    $stmt = $item->getPaidData(); //GET data from the query
    $itemCount = $stmt->rowCount(); //Get the row count

    if($itemCount > 0){
        
        $employeeArr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row); //Extract the data 
            $e = array(
                 "Customer_ID" => intVal($Customer_ID), 
                "Customer_name" => strVal(str_replace('+',' ',$Customer_name)),  
                "Customer_purchase" => strVal($Customer_purchase),
                "Customer_date" => strVal($Customer_date),
                "Customer_total" => intVal($Customer_total),
                "Customer_payment" => strVal($Customer_payment),


            );
            array_push($employeeArr, $e);
        }
        echo json_encode($employeeArr);
    }
    else{

        echo json_encode(
            array(
            array(  "Customer_ID" => 0, 
            "Customer_name" => "No record name",  
            "Customer_purchase" => "No record purchase",
            "Customer_date" => strVal("0000-00-00"),
            "Customer_total" => 0,
            "Customer_payment" => 0,

))
        );
    }

?>