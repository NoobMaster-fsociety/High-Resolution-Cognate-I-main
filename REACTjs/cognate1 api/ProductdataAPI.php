<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../cognate1 api/Database.php';

    $item = new Database();

    $stmt = $item->getProductData(); //GET data from the query
    $itemCount = $stmt->rowCount(); //Get the row count

    if($itemCount > 0){
        
        $employeeArr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row); //Extract the data 
            $e = array(
                "Product_ID" => intVal($Product_ID), 
                "Product_image" => strVal($Product_image), 
                "Product_name" => strVal(str_replace('+',' ',$Product_name)),
                "Product_category" => strVal($Product_category),
                "Product_stocks" => intVal($Product_stocks),
                "Product_price" => intVal($Product_price),
                "Product_Status" => strVal($Product_Status),


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