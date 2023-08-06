<?php 
    class Database {
        //host
        private $host = "127.0.0.1";
        //Database name
        private $database_name = "cognate";

        // Table name
        private $db_table = "cognate_table"; //Login data
        private $db_product_table = "product_data"; //Product data
        private $db_customer_table = "customer_data"; //Customer data
        private $db_category = "category"; //category data
        
        private $Dusername = "root";
        private $Dpassword = "";
        public $conn;

        // Columns for Login data
        public $ID;
        public $email;
        public $password;
        public $sec1;
        public $sec2;
        public $code;

        // Columns for Product data

        public $Product_ID = null;
        public $Product_image = null;
        public $Product_name  = null;
        public $Product_category  = null;
        public $Product_stocks = null;
        public $Product_price = null;

        // Columns for Customer data
        public $Customer_ID = null;
        public $Customer_name = null;
        public $Customer_email = null;
        public $Customer_cell = null;
        public $Customer_address= null;
        public $Customer_purchase = null;
        public $Customer_date = null;
        public $Customer_total = null;
        public $Customer_Quantity= null;
        public $Customer_modepayment= null;
        public $Customer_payment = null;
    
        


//QUERY CONNECTION
        public function getConnection(){
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . 
                $this->host . ";dbname=" . 
                $this->database_name, 
                $this->Dusername, 
                $this->Dpassword);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return $this->conn;
        }


// *********************************QUERY FOR LOGIN********************************** 

///LOG IN AUTHENTUCATION QUERY
    public function Code_Authentication(){
        $sqlQuery = "SELECT
                *
                FROM
                ". $this->db_table ."
                WHERE 
                    code = :code";

    $stmt = $this->getConnection()->prepare($sqlQuery);

    $this->code=htmlspecialchars(strip_tags($this->code));



    $stmt->bindParam(":code", $this->code);


    $stmt->execute();
    $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($dataRow == null){
      return false;
    }else{
        return true;
    }
    

    
}

// UPDATE code
public function updateCode(){
    $sqlQuery = "UPDATE
                ". $this->db_table ."
            SET
                code = :code
            WHERE 
                ID = 1";

    $stmt = $this->getConnection()->prepare($sqlQuery);


    $this->code=htmlspecialchars(strip_tags($this->code));



    // bind data

    $stmt->bindParam(":code", $this->code);

    if($stmt->execute()){
       return true;
    }
    return false;
}

// UPDATE Password
public function updatePassword(){
    $sqlQuery = "UPDATE
                ". $this->db_table ."
            SET
                password = :password
            WHERE 
                ID = 1";

    $stmt = $this->getConnection()->prepare($sqlQuery);


    $this->password=htmlspecialchars(strip_tags($this->password));



    // bind data

    $stmt->bindParam(":password", $this->password);

    if($stmt->execute()){
       return true;
    }
    return false;
}

///Security AUTHENTUCATION QUERY
public function Security_Authentication(){
    $sqlQuery = "SELECT
                *
                FROM
                ". $this->db_table ."
                WHERE 
                    sec1 = :sec1
                AND 
                    sec2 = :sec2";

    $stmt = $this->getConnection()->prepare($sqlQuery);

    $this->sec1=htmlspecialchars(strip_tags($this->sec1));
    $this->sec2=htmlspecialchars(strip_tags($this->sec2));


    $stmt->bindParam(":sec1", $this->sec1);
    $stmt->bindParam(":sec2", $this->sec2);

    $stmt->execute();
    $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($dataRow == null){
      return false;
    }else{
        return true;
    }
    
    // if ($stmt->execute()){
     //   return true;
     //}else{
    //      return false;
   //   }
    //  
    
}

///LOG IN AUTHENTUCATION QUERY
        public function Login_Authentication(){
            $sqlQuery = "SELECT
                        *
                        FROM
                        ". $this->db_table ."
                        WHERE 
                            email = :email
                        AND 
                            password = :password";
        
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
        
        
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
        
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
  
            if ($dataRow == null){
              return false;
            }else{
                return true;
            }
            
            // if ($stmt->execute()){
             //   return true;
             //}else{
            //      return false;
           //   }
            //  
            
        }
        
// UPDATE LOGIN
        public function updateLogin(){
            $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        email = :email, 
                        password = :password, 
                        sec1 = :sec1, 
                        sec2 = :sec2
                    WHERE 
                        ID = 1";
        
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->sec1=htmlspecialchars(strip_tags($this->sec1));
            $this->sec2=htmlspecialchars(strip_tags($this->sec2));

        
            // bind data

            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":password", $this->password);
            
            $stmt->bindParam(":sec1", $this->sec1);
            $stmt->bindParam(":sec2", $this->sec2);

            if($stmt->execute()){
               return true;
            }
            return false;
        }

// GET ALL login data
        public function getLoginData(){

            $sqlQuery = 
            "SELECT 
                * 
            FROM " . $this->db_table . "";

            $stmt = $this->getConnection()->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }


// *********************************QUERY FOR CountOrders**********************************

public function getRowsNumber() {
 
     $sqlQuery = "SELECT Product_ID  FROM " . $this->db_product_table . "";

   $stmt =  $this->getConnection()->prepare($sqlQuery);
    try { $stmt->execute();}
    catch(PDOException $e){echo $e->getMessage();}

return $stmt->rowCount();
    }

    // *********************************QUERY FOR totalsales**********************************

    public function getTotalsales() {
 
        $stmt =  $this->getConnection()->prepare("SELECT SUM(Customer_total) AS value_sum FROM " . $this->db_customer_table . " where Customer_payment LIKE 'Paid' ");
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row['value_sum'] !== null){
            return  $row['value_sum'];
        }

        return 0;

    }

     // *********************************QUERY FOR totalsales**********************************

    public function getpercentsales() {
$todaysDate = date('Y-m-d'); //if your date is stored in y-m-d format

//Our SQL statement.
$stmt =  $this->getConnection()->prepare ("SELECT SUM(Customer_total) AS value_sum  from " . $this->db_customer_table . " where Customer_date LIKE '$todaysDate'AND Customer_payment LIKE 'Paid'");

//Execute.
$stmt->execute();

//Fetch the rows from today.
$row= $stmt->fetch(PDO::FETCH_ASSOC);


return $row['value_sum'];

    }

         // *********************************QUERY FOR salestodayslist**********************************

    public function gettodayRsales() {
$todaysDate = date('Y-m-d'); //if your date is stored in y-m-d format

        $sqlQuery = "SELECT Customer_ID,
Customer_name,
Customer_purchase,
 Customer_date,
 Customer_total ,
Customer_payment FROM " . $this->db_customer_table . " where Customer_date LIKE '$todaysDate' AND Customer_payment LIKE 'Paid'";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    
         // *********************************QUERY FOR getMonthsales**********************************

    public function getMonthsales() {
//get first day of the current month 
$start = date("Y-m-1 00:00:00");
//get current date of the month
$end = date("Y-m-d H:i:s");
        $sqlQuery = "SELECT Customer_ID,
Customer_name,
Customer_purchase,
 Customer_date,
 Customer_total ,
Customer_payment FROM " . $this->db_customer_table . " where Customer_date BETWEEN '$start' AND '$end' AND Customer_payment LIKE 'Paid'";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    
      // *********************************QUERY FOR getMonthsales**********************************
   
            // *********************************QUERY FOR Pending Orders**********************************

    public function gettodayPsales() {
$todaysDate = date('Y-m-d'); //if your date is stored in y-m-d format

        $sqlQuery = "SELECT Customer_ID,
Customer_name,
Customer_purchase,
 Customer_date,
 Customer_total ,
Customer_payment FROM " . $this->db_customer_table . " where Customer_payment LIKE 'Pending'";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    // *********************************QUERY FOR CountPendingOrders**********************************

public function getPendingNumber() {
 
    $sqlQuery = "SELECT Customer_ID,
Customer_name,
Customer_purchase,
 Customer_date,
 Customer_total ,
Customer_payment FROM " . $this->db_customer_table . " where Customer_payment LIKE 'Pending'";

   $stmt =  $this->getConnection()->prepare($sqlQuery);
    try { $stmt->execute();}
    catch(PDOException $e){echo $e->getMessage();}

return $stmt->rowCount();
    }

      // *********************************QUERY FOR AllPaidOrders**********************************
         // GET ALL Customer data
    public function getPaidData()
    {
        $sqlQuery = "SELECT Customer_ID,
Customer_name,
Customer_purchase,
 Customer_date,
 Customer_total ,
Customer_payment FROM " . $this->db_customer_table . " where Customer_payment LIKE 'Paid'";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }



     // *********************************QUERY FOR totalsalesbydates**********************************
    //<?php
//$total_income_query = $db->prepare("
  //  SELECT SUM(credit) 
    //from accounts 
    //WHERE date BETWEEN STR_TO_DATE(:startDate, '%d/%m/%Y') 
      //         AND STR_TO_DATE(:endDate, '%d/%m/%Y')");

//$stmt->bindParam(':startDate',$startDate);
//$stmt->bindParam(':endDate',$endDate);
//$stmt->execute();

//$total = $stmt->fetch(PDO::FETCH_NUM);

//echo $total_income = $total[0];











    // *********************************QUERY FOR Product Data**********************************

// minus pag may nag add na customer na data
// Process:
// first: from api remove " [] " Purchase and Quantity
// second: explode() the Purchase and Quantity from api
// third : Create a retrieve and insert Query
//   using a foreach retrieve each data stocks - quantity = new Stocks
//   insert a new Stocks 

public $current_stocks = 0;

// retrieve specific productdata
function retrieve_each_stocks($product){
    $sqlQuery = "SELECT * FROM " . $this->db_product_table . " WHERE Product_name = ?";
    $stmt = $this->getConnection()->prepare($sqlQuery);

    // $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));

    $stmt->bindParam(1, $product);
    $stmt->execute();
    $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($dataRow != null){

        return  $this->current_stocks = $dataRow['Product_stocks'] - 1;
         
    }else{
        return false;
    }
}


// UPDATE specific data
public function update_newStocks($purchase,$quantity){
    $sqlQuery = 
    "UPDATE
            ". $this->db_product_table ."
        SET
            Product_stocks = Product_stocks - :Product_stocks
        WHERE 
        Product_name = :Product_name ";

    $stmt = $this->getConnection()->prepare($sqlQuery);


    $stmt->bindParam(":Product_name", $purchase,PDO::PARAM_STR);
    $stmt->bindParam(":Product_stocks", $quantity,PDO::PARAM_INT);

    return $stmt->execute();
  

}

// GET ALL Product data
        public function getProductData(){
            $sqlQuery = "SELECT * FROM " . $this->db_product_table . "";
            $stmt = $this->getConnection()->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }



// GET ALL category
    public function getcategory()
    {
        $sqlQuery = "SELECT * FROM " . $this->db_category . "";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }


// check CATEGORY if exist
        public function category_Authentication($category){
            $sqlQuery = "SELECT * FROM ". $this->db_category ."
        WHERE 
            category = :category";

        $stmt = $this->getConnection()->prepare($sqlQuery);

        $category=htmlspecialchars(strip_tags($category));

        $stmt->bindParam(":category", $category,PDO::PARAM_STR);




        $stmt->execute();
        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dataRow == null){
            return true;
        }else{
            return false;
        }

        }


// insert categoty
        public function insert_category($category){


            $sqlQuery = "INSERT INTO
                            ". $this->db_category ." 
                        SET
                            category = :category";
        
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            // sanitize
   
            $category=htmlspecialchars(strip_tags($category));

     
            // // bind data

            $stmt->bindParam(":category", $category);


            if ($stmt->execute()){
                return true;
            }else{
                return false;
            }

       
        }

// check data if exist
        public function Check_Authentication(){
            $sqlQuery = "SELECT * FROM ". $this->db_product_table ."
        WHERE 
            Product_name = :Product_name";

        $stmt = $this->getConnection()->prepare($sqlQuery);

        $this->Product_name=htmlspecialchars(strip_tags($this->Product_name));

        $stmt->bindParam(":Product_name", $this->Product_name,PDO::PARAM_STR);

        $stmt->bindParam(":Product_name", $this->Product_name);


        $stmt->execute();
        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dataRow == null){
            return true;
        }else{
            return false;
        }

        }



// CREATE product data
        public function create_productdata(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_product_table ."
                    SET
                        Product_ID = :Product_ID,
                        Product_image = :Product_image,
                        Product_name = :Product_name,
                        Product_category = :Product_category,
                        Product_stocks = :Product_stocks,
                        Product_price = :Product_price,
                        Product_Status = :Product_Status";
        
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            // sanitize
   
            $this->Product_name=htmlspecialchars(strip_tags($this->Product_name));
            $this->Product_category=htmlspecialchars(strip_tags($this->Product_category));
            $this->Product_stocks=htmlspecialchars(strip_tags($this->Product_stocks));
            $this->Product_price=htmlspecialchars(strip_tags($this->Product_price));
            $this->Product_Status=htmlspecialchars(strip_tags($this->Product_Status));
     
            // // bind data
            $stmt->bindParam(":Product_ID", $this->Product_ID,PDO::PARAM_INT);
            $stmt->bindParam(":Product_image", $this->Product_image);
            $stmt->bindParam(":Product_name", $this->Product_name,PDO::PARAM_STR);
            $stmt->bindParam(":Product_category", $this->Product_category,PDO::PARAM_STR);
            $stmt->bindParam(":Product_stocks", $this->Product_stocks,PDO::PARAM_INT);
            $stmt->bindParam(":Product_price", $this->Product_price,PDO::PARAM_INT);
            $stmt->bindParam(":Product_Status", $this->Product_Status,PDO::PARAM_STR);

            if ($stmt->execute()){
                return true;
            }
            return false;
        }

// DELETE specific data
        function delete_productdata(){
            $sqlQuery = "DELETE FROM " . $this->db_product_table . " WHERE Product_ID = ?";
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));
        
            $stmt->bindParam(1, $this->Product_ID);
        
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
            
        }

        
        // DELETE specific data
        function delete_Archiveproductdata(){
            $sqlQuery = "DELETE FROM product_retrievedata WHERE Product_ID = ?";
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));
        
            $stmt->bindParam(1, $this->Product_ID);
        
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
            
        }

// retrieve specific productdata
        function retrieve_productdata(){
            $sqlQuery = "SELECT * FROM " . $this->db_product_table . " WHERE Product_ID = ?";
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));
        
            $stmt->bindParam(1, $this->Product_ID);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($dataRow != null){
                $this->Product_ID = $dataRow['Product_ID'];
                $this->Product_image = $dataRow['Product_image'];
                $this->Product_name = $dataRow['Product_name'];
                $this->Product_category = $dataRow['Product_category'];
                $this->Product_stocks = $dataRow['Product_stocks'];
                $this->Product_price = $dataRow['Product_price'];
                $this->Product_Status = $dataRow['Product_Status'];

                return true;
            }else{
                return false;
            }
        }


// retrieve specific  archive productdata
        function retrieve_Archiveproductdata(){
            $sqlQuery = "SELECT * FROM product_retrievedata WHERE Product_ID = ?";
            $stmt = $this->getConnection()->prepare($sqlQuery);
        
            $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));
        
            $stmt->bindParam(1, $this->Product_ID);
            $stmt->execute();
            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($dataRow != null){
                $this->Product_ID = $dataRow['Product_ID'];
                $this->Product_image = $dataRow['Product_image'];
                $this->Product_name = $dataRow['Product_name'];
                $this->Product_category = $dataRow['Product_category'];
                $this->Product_stocks = $dataRow['Product_stocks'];
                $this->Product_price = $dataRow['Product_price'];
                 $this->Product_Status = $dataRow['Product_Status'];

                return true;
            }else{
                return false;
            }
        }

// Create archive productdata
public function create_Archiveproductdata(){
    $sqlQuery = "INSERT INTO
                 product_retrievedata
            SET
                Product_ID = :Product_ID,
                Product_image = :Product_image,
                Product_name = :Product_name,
                Product_category = :Product_category,
                Product_stocks = :Product_stocks,
                Product_price = :Product_price,
                Product_Status = :Product_Status";

    $stmt = $this->getConnection()->prepare($sqlQuery);


    // // bind data
    $stmt->bindParam(":Product_ID", $this->Product_ID,PDO::PARAM_INT);
    $stmt->bindParam(":Product_image", $this->Product_image);
    $stmt->bindParam(":Product_name", $this->Product_name,PDO::PARAM_STR);
    $stmt->bindParam(":Product_category", $this->Product_category,PDO::PARAM_STR);
    $stmt->bindParam(":Product_stocks", $this->Product_stocks,PDO::PARAM_INT);
    $stmt->bindParam(":Product_price", $this->Product_price,PDO::PARAM_INT);
      $stmt->bindParam(":Product_Status", $this->Product_Status,PDO::PARAM_STR);

    if ($stmt->execute()){
        return true;
    }
    return false;
}



// Savve to recycle bin  productdata
public function Save_Binroductdata(){
    $sqlQuery = "INSERT INTO
                 recycle_bin_product
            SET
                Product_ID = :Product_ID,
                Product_image = :Product_image,
                Product_name = :Product_name,
                Product_category = :Product_category,
                Product_stocks = :Product_stocks,
                Product_price = :Product_price,
                Product_Status = :Product_Status";

    $stmt = $this->getConnection()->prepare($sqlQuery);


    // // bind data
    $stmt->bindParam(":Product_ID", $this->Product_ID,PDO::PARAM_INT);
    $stmt->bindParam(":Product_image", $this->Product_image);
    $stmt->bindParam(":Product_name", $this->Product_name,PDO::PARAM_STR);
    $stmt->bindParam(":Product_category", $this->Product_category,PDO::PARAM_STR);
    $stmt->bindParam(":Product_stocks", $this->Product_stocks,PDO::PARAM_INT);
    $stmt->bindParam(":Product_price", $this->Product_price,PDO::PARAM_INT);
    $stmt->bindParam(":Product_Status", $this->Product_Status,PDO::PARAM_STR);

    if ($stmt->execute()){
        return true;
    }
    return false;
}


// GET ALL archive Product data
public function get_ArchiveProductData(){
    $sqlQuery = "SELECT * FROM product_retrievedata";
    $stmt = $this->getConnection()->prepare($sqlQuery);
    $stmt->execute();
    return $stmt;
}
   
        
// UPDATE specific data
public function update_productdata(){
    $sqlQuery = 
    "UPDATE
            ". $this->db_product_table ."
        SET
            Product_image = :Product_image,
            Product_name = :Product_name,
            Product_category = :Product_category,
            Product_stocks = :Product_stocks,
            Product_price = :Product_price,
            Product_Status = :Product_Status
        WHERE 
            Product_ID = :Product_ID";

    $stmt = $this->getConnection()->prepare($sqlQuery);

    // sanitize

    $this->Product_ID=htmlspecialchars(strip_tags($this->Product_ID));
    $this->Product_name=htmlspecialchars(strip_tags($this->Product_name));
    $this->Product_category=htmlspecialchars(strip_tags($this->Product_category));
    $this->Product_stocks=htmlspecialchars(strip_tags($this->Product_stocks));
    $this->Product_price=htmlspecialchars(strip_tags($this->Product_price));
      $this->Product_Status=htmlspecialchars(strip_tags($this->Product_Status));


    //bind data
    $stmt->bindParam(":Product_image", $this->Product_image);
    $stmt->bindParam(":Product_ID", $this->Product_ID,PDO::PARAM_INT);
    $stmt->bindParam(":Product_name", $this->Product_name,PDO::PARAM_STR);
    $stmt->bindParam(":Product_category", $this->Product_category,PDO::PARAM_STR);
    $stmt->bindParam(":Product_stocks", $this->Product_stocks,PDO::PARAM_INT);
    $stmt->bindParam(":Product_price", $this->Product_price,PDO::PARAM_INT);
     $stmt->bindParam(":Product_Status", $this->Product_Status,PDO::PARAM_STR);

    if($stmt->execute()){
        return true;
    }else {
        return false;
    }

}

    // *********************************QUERY FOR Customer Data**********************************
      // GET ALL Customer data
    public function getTransData()
    {
        $sqlQuery = "SELECT Customer_ID,
                Customer_name,
                Customer_purchase,
                Customer_date,
                Customer_total ,
                Customer_payment FROM " . $this->db_customer_table . "";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }



// *********************************QUERY FOR Customer Data**********************************



// check data if exist
        public function Check_CustomerAuthentication(){
            $sqlQuery = "SELECT
            *
            FROM
            ". $this->db_customer_table ."
            WHERE 
            Customer_name = :Customer_name";

        $stmt = $this->getConnection()->prepare($sqlQuery);

        $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));

        $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);

        $stmt->bindParam(":Customer_name", $this->Customer_name);


        $stmt->execute();
        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dataRow == null){
            return true;
        }else{
            return false;
        }

        }


// CREATE customer data
    public function create_customerdata(){
        $sqlQuery = "INSERT INTO
                    ". $this->db_customer_table ."
                SET

                    Customer_name = :Customer_name,
                    Customer_email = :Customer_email,
                    Customer_cell = :Customer_cell,
                    Customer_address = :Customer_address,
                    Customer_purchase = :Customer_purchase,
                    Customer_date = :Customer_date,
                    Customer_total = :Customer_total,
                    Customer_Quantity = :Customer_Quantity,
                    Customer_modepayment = :Customer_modepayment,
                    Customer_payment = :Customer_payment";


        $stmt = $this->getConnection()->prepare($sqlQuery);


        // sanitize


        $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
        $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
        $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
        $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
        $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
        $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
        $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
        $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
        $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
        $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));

   
    // // bind data

        $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
        $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);

        if ($stmt->execute()){
            return true;
        }
            return false;
    }


    // GET ALL Customer data
    public function getCustomerData()
    {
        $sqlQuery = "SELECT * FROM " . $this->db_customer_table . "";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }


    // UPDATE customer specific data
    public function update_customerdata(){
        $sqlQuery = 
        "UPDATE
                ". $this->db_customer_table ."
                SET

                Customer_name = :Customer_name,
                Customer_email = :Customer_email,
                Customer_cell = :Customer_cell,
                Customer_address = :Customer_address,
                Customer_purchase = :Customer_purchase,
                Customer_date = :Customer_date,
                Customer_total = :Customer_total,
                Customer_Quantity = :Customer_Quantity,
                Customer_modepayment = :Customer_modepayment,
                Customer_payment = :Customer_payment
            WHERE 
                Customer_ID = :Customer_ID";

        $stmt = $this->getConnection()->prepare($sqlQuery);

        // sanitize

        $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));
        $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
        $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
        $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
        $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
        $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
        $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
        $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
        $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
        $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
        $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));

   
    // // bind data
        $stmt->bindParam(":Customer_ID", $this->Customer_ID,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
        $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);


        if($stmt->execute()){
            return true;
        }else {
            return false;
        }
    
    }

    // DELETE specific customer data
    function delete_customerdata(){
        $sqlQuery = "DELETE FROM " . $this->db_customer_table . " WHERE Customer_ID = ?";
        $stmt = $this->getConnection()->prepare($sqlQuery);
    
        $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));;
    
        $stmt->bindParam(1, $this->Customer_ID);
    
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
        
    }


// *********************************QUERY FOR Customer Draft* *********************************

// CREATE customer data with ID
public function save_to_binCustomer(){
    $sqlQuery = "INSERT INTO
                recycle_bin_customer
            SET
                Customer_ID = :Customer_ID,
                Customer_name = :Customer_name,
                Customer_email = :Customer_email,
                Customer_cell = :Customer_cell,
                Customer_address = :Customer_address,
                Customer_purchase = :Customer_purchase,
                Customer_date = :Customer_date,
                Customer_total = :Customer_total,
                Customer_Quantity = :Customer_Quantity,
                Customer_modepayment = :Customer_modepayment,
                Customer_payment = :Customer_payment";

                //Customer_ID = :Customer_ID
    $stmt = $this->getConnection()->prepare($sqlQuery);


    // sanitize

    $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));
    $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
    $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
    $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
    $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
    $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
    $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
    $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
    $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
    $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
    $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));


// // bind data
     $stmt->bindParam(":Customer_ID", $this->Customer_ID,PDO::PARAM_INT);
    $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
    $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);

    if ($stmt->execute()){
        return true;
    }
        return false;
}


public function create_customerdata_ID(){
    $sqlQuery = "INSERT INTO
                ". $this->db_customer_table ."
            SET
                Customer_ID = :Customer_ID,
                Customer_name = :Customer_name,
                Customer_email = :Customer_email,
                Customer_cell = :Customer_cell,
                Customer_address = :Customer_address,
                Customer_purchase = :Customer_purchase,
                Customer_date = :Customer_date,
                Customer_total = :Customer_total,
                Customer_Quantity = :Customer_Quantity,
                Customer_modepayment = :Customer_modepayment,
                Customer_payment = :Customer_payment";

                //Customer_ID = :Customer_ID
    $stmt = $this->getConnection()->prepare($sqlQuery);


    // sanitize

    $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));
    $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
    $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
    $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
    $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
    $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
    $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
    $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
    $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
    $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
    $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));


// // bind data
     $stmt->bindParam(":Customer_ID", $this->Customer_ID,PDO::PARAM_INT);
    $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
    $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);

    if ($stmt->execute()){
        return true;
    }
        return false;
}


// retrieve specific productdata
function retrieve_customerdata(){
    $sqlQuery = "SELECT * FROM " . $this->db_customer_table . " WHERE Customer_ID = ?";
    $stmt = $this->getConnection()->prepare($sqlQuery);

    $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));

    $stmt->bindParam(1, $this->Customer_ID);
    $stmt->execute();
    $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($dataRow != null){
        $this->Customer_ID = $dataRow['Customer_ID'];
        $this->Customer_name = $dataRow['Customer_name'];
        $this->Customer_email = $dataRow['Customer_email'];
        $this->Customer_cell = $dataRow['Customer_cell'];
        $this->Customer_address = $dataRow['Customer_address'];
        $this->Customer_purchase = $dataRow['Customer_purchase'];
        $this->Customer_date = $dataRow['Customer_date'];
        $this->Customer_total = $dataRow['Customer_total'];
        $this->Customer_Quantity = $dataRow['Customer_Quantity'];
        $this->Customer_modepayment = $dataRow['Customer_modepayment'];
        $this->Customer_payment = $dataRow['Customer_payment'];

        return true;
    }else{
        return false;
    }
}

// retrieve specific archive productdata
function retrieve_Arhicecustomerdata(){
    $sqlQuery = "SELECT * FROM customer_data_draft WHERE Customer_ID = ?";
    $stmt = $this->getConnection()->prepare($sqlQuery);

    $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));

    $stmt->bindParam(1, $this->Customer_ID);
    $stmt->execute();
    $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($dataRow != null){
        $this->Customer_ID = $dataRow['Customer_ID'];
        $this->Customer_name = $dataRow['Customer_name'];
        $this->Customer_email = $dataRow['Customer_email'];
        $this->Customer_cell = $dataRow['Customer_cell'];
        $this->Customer_address = $dataRow['Customer_address'];
        $this->Customer_purchase = $dataRow['Customer_purchase'];
        $this->Customer_date = $dataRow['Customer_date'];
        $this->Customer_total = $dataRow['Customer_total'];
        $this->Customer_Quantity = $dataRow['Customer_Quantity'];
        $this->Customer_modepayment = $dataRow['Customer_modepayment'];
        $this->Customer_payment = $dataRow['Customer_payment'];

        return true;
    }else{
        return false;
    }
}

// CREATE ---------------------------

// CREATE customer Draft data without ID
public function C_reate_customerDataDraft(){

   $sqlQuery = "INSERT INTO
                customer_data_draft
            SET

                Customer_name = :Customer_name,
                Customer_email = :Customer_email,
                Customer_cell = :Customer_cell,
                Customer_address = :Customer_address,
                Customer_purchase = :Customer_purchase,
                Customer_date = :Customer_date,
                Customer_total = :Customer_total,
                Customer_Quantity = :Customer_Quantity,
                Customer_modepayment = :Customer_modepayment,
                Customer_payment = :Customer_payment";


    $stmt = $this->getConnection()->prepare($sqlQuery);


    // sanitize


    $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
    $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
    $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
    $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
    $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
    $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
    $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
    $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
    $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
    $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));


// // bind data

    $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
    $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);

    if ($stmt->execute()){
        return true;
    }
        return false;
    }

// RETRIEVE ---------------------------

    // GET ALL Customer data
    public function getCustomerDataDraft()
    {
        $sqlQuery = "SELECT * FROM customer_data_draft";
        $stmt = $this->getConnection()->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

// UPDATE ---------------------------


    // UPDATE customer specific data
    public function update_customerDraftdata(){
        $sqlQuery = 
        "UPDATE
                customer_data_draft
                SET

                Customer_name = :Customer_name,
                Customer_email = :Customer_email,
                Customer_cell = :Customer_cell,
                Customer_address = :Customer_address,
                Customer_purchase = :Customer_purchase,
                Customer_date = :Customer_date,
                Customer_total = :Customer_total,
                Customer_Quantity = :Customer_Quantity,
                Customer_modepayment = :Customer_modepayment,
                Customer_payment = :Customer_payment
            WHERE 
                Customer_ID = :Customer_ID";

        $stmt = $this->getConnection()->prepare($sqlQuery);

        // sanitize

        $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));
        $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
        $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
        $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
        $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
        $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
        $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
        $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
        $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
        $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
        $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));

   
    // // bind data
        $stmt->bindParam(":Customer_ID", $this->Customer_ID,PDO::PARAM_INT);
        $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
        $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
        $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);


        if($stmt->execute()){
            return true;
        }else {
            return false;
        }
    
    }




// DELETE ---------------------------

    // DELETE specific customer data
    function delete_customerDraftdata(){
        $sqlQuery = "DELETE FROM customer_data_draft WHERE Customer_ID = ?";
        $stmt = $this->getConnection()->prepare($sqlQuery);
    
        $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));;
    
        $stmt->bindParam(1, $this->Customer_ID);
    
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
        
    }


// ////////////////////////////////////////////////////////////////////////////////////////

// First retrieve the specifiC Customer data
// Second delete the the specifiC Customer data
// Lastly create_customerDataDraft 




// CREATE customer data DRAFT from customer data
public function create_customerDataDraft(){
    $sqlQuery = "INSERT INTO
                customer_data_draft
            SET
                Customer_ID = :Customer_ID,
                Customer_name = :Customer_name,
                Customer_email = :Customer_email,
                Customer_cell = :Customer_cell,
                Customer_address = :Customer_address,
                Customer_purchase = :Customer_purchase,
                Customer_date = :Customer_date,
                Customer_total = :Customer_total,
                Customer_Quantity = :Customer_Quantity,
                Customer_modepayment = :Customer_modepayment,
                Customer_payment = :Customer_payment";


    $stmt = $this->getConnection()->prepare($sqlQuery);


    // sanitize

    $this->Customer_ID=htmlspecialchars(strip_tags($this->Customer_ID));
    $this->Customer_name=htmlspecialchars(strip_tags($this->Customer_name));
    $this->Customer_email=htmlspecialchars(strip_tags($this->Customer_email));
    $this->Customer_cell=htmlspecialchars(strip_tags($this->Customer_cell));
    $this->Customer_address=htmlspecialchars(strip_tags($this->Customer_address));
    $this->Customer_purchase=htmlspecialchars(strip_tags($this->Customer_purchase));
    $this->Customer_date=htmlspecialchars(strip_tags($this->Customer_date));
    $this->Customer_total=htmlspecialchars(strip_tags($this->Customer_total));
    $this->Customer_Quantity=htmlspecialchars(strip_tags($this->Customer_Quantity));
    $this->Customer_modepayment=htmlspecialchars(strip_tags($this->Customer_modepayment));
    $this->Customer_payment=htmlspecialchars(strip_tags($this->Customer_payment));


// // bind data
    $stmt->bindParam(":Customer_ID", $this->Customer_ID,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_name", $this->Customer_name,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_email", $this->Customer_email,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_cell", $this->Customer_cell,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_address", $this->Customer_address,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_purchase", $this->Customer_purchase,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_date", $this->Customer_date,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_total", $this->Customer_total,PDO::PARAM_INT);
    $stmt->bindParam(":Customer_Quantity", $this->Customer_Quantity,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_modepayment", $this->Customer_modepayment,PDO::PARAM_STR);
    $stmt->bindParam(":Customer_payment", $this->Customer_payment,PDO::PARAM_STR);

    if ($stmt->execute()){
        return true;
    }
        return false;
}


// to delete the data from a draft you must
// First Create customer_data
// Second delete Customer_data_draft




}?>