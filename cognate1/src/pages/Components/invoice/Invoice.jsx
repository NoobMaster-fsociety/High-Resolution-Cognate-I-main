// Library components

import { Grid, 
        InputAdornment,
        Typography,
        Fab,
        IconButton,
        Collapse,
        Button,
        FormControlLabel,
        Alert,
        RadioGroup,
        Radio,
        Tooltip,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogContentText,
        DialogActions,
        ListItemText,

} from '@mui/material'
import { CTextField } from '../products/Products' 

import React, { useEffect, useState } from 'react'


// Icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

// Routes
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';



// Transfer data to edit data
export var dataT = {}
export var set_para_di_maedits = true




const Invoice = () => {
// Navigation
let NavS = useNavigate();




// Column header
const columns = [

  // ID Column
  { field: 'Customer_ID', 
    headerName: 'ID', 
    width: 70 ,
    headerAlign: 'center',

    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "black",
            fontSize: 18,
            width: "100%",
            textAlign: "center"
          }}
        >
          {cellValues.value}
        </div>
      );
    }
  },

  // name Column
  { field: 'Customer_name', 
    headerName: 'name', 
    width: 200,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center', 

    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "black",
            fontSize: 18,
            width: "100%",
            textAlign: "center"
          }}
        >
          {cellValues.value}
        </div>
      );
    }
  
  },



  { field: 'Customer_email', 
    headerName: 'email', 
    width: 130,
    headerAlign: 'center', 

    renderCell: (cellValues) => {
      return (
      <div
      style={{
        color: "black",
        fontSize: 18,
        width: "100%",
        textAlign: "center"
        }}
      >
        {cellValues.value}
        </div>
        );
    }
  },

  { field: 'Customer_cell', 
    headerName: 'Cellphone number', 
    width: 150,
    headerAlign: 'center', 

    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "black",
            fontSize: 18,
            width: "100%",
            textAlign: "center"
          }}
        >
          {cellValues.value}
        </div>
      );
    }
  },


{ field: 'Customer_date', 
headerName: 'date', 
width: 150,
headerAlign: 'center', 

renderCell: (cellValues) => {
  return (
    <div
      style={{
        color: "black",
        fontSize: 18,
        width: "100%",
        textAlign: "center"
      }}
    >
      {cellValues.value}
    </div>
  );
}
},

{ field: 'Customer_total', 
headerName: 'total payment', 
width: 130,
headerAlign: 'center', 

renderCell: (cellValues) => {
  return (
    <div
      style={{
        color: "black",
        fontSize: 18,
        width: "100%",
        textAlign: "center"
      }}
    >
      {cellValues.value}
    </div>
  );
}
},

{ field: 'Customer_payment', 
headerName: 'status', 
width: 130,
headerAlign: 'center', 

renderCell: (cellValues) => {
  return (
    <div
      style={{
        color: "black",
        fontSize: 18,
        width: "100%",
        textAlign: "center"
      }}
    >
      {cellValues.value}
    </div>
  );
}
},
  
// delete
  {
    field: 'action',
    headerName: 'Delete',
    width: 130,
    headerAlign: 'center', 
    renderCell: () => {
      return (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            // marginRight: '2'
          }}
        >
         

        <IconButton color="primary" aria-label="delete">
            <DeleteOutlineOutlinedIcon/>
        </IconButton>
         
        </div>


      );
    }
  },
  // edit
  {
    field: 'View',
    headerName: 'View',
    width: 130,
    headerAlign: 'center', 
    renderCell: () => {
      return (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            // marginRight: '2'
          }}
        >
         

        <IconButton color="primary" aria-label="delete">
            <ModeEditOutlineRoundedIcon/>
        </IconButton>
         
        </div>


      );
    }
  }

];
//search data variable
const [search,setSearch] = useState("")

// Data 
const [Data,set] = useState()

const [data, setData] = useState({
  "Customer_name": "",
  "Customer_email": "",
  "Customer_cell": "",
  "Customer_address": "",
  "Customer_purchase": "A,B,C,D",
  "Customer_date": "",
  "Customer_Quantity": "0,1,2,3",
  "Customer_modepayment": "PAYMAYA",
  "Customer_payment":  "Paid"
})

// 
const test = () =>{
    
  const Customer_purchase = data.Customer_purchase.split(',')
  const Customer_Quantity = data.Customer_Quantity.split(',')



  return [...Array(Customer_purchase.length)].map(
    (_ , i) => ({
      Customer_ID: parseInt(i),
      Customer_purchase: Customer_purchase[i],
      Customer_price: parseInt(i),
      Customer_Quantity: Customer_Quantity[i],
      Customer_total: parseInt(i)
    }));



}

// Status
const [stat, setStat] = useState("Paid")

// const data_stat = Data.filter(person=>person.Customer_payment === stat )

// Filtering data 
const filtered = !search ? 
Data 
: Data.filter((person) => 
    person.Customer_name.toLowerCase().includes(search.toLowerCase())
  );


// Show success
const [show_success,setShow_success] = useState(false)

// Show error
const [show_error,setShow_error] = useState()


// Htttp get request
useEffect(() => {
  axios.get('http://localhost/REACTJS/cognate1%20api/CustomerdataAPI.php')
.then(res=>set(res.data.filter(person=>
  
    person.Customer_payment === stat 
  
)))
.catch(err=>console.log(err)) 
})


// Succesful deleted
const [del_ID,setDel_ID] = useState()

const success_delete = e =>
{
  axios.post("http://localhost/REACTJS/cognate1%20api/Delete_CustomerdataAPI.php", { "Customer_ID": del_ID } )
  .then(res => 
    {
      setShow_success(res.data[0].Result)   
      setConfirm_delete(false)
    }

    
    )
}



  // Delete customerdata
const delete_customerdata = (param) => {
  
  switch(param.field) {
    // delete
    case 'action':
      setDel_ID(parseInt(param.id))
      setConfirm_delete(true)
    break;

    // edit data
    case 'View':
        edit_customerdata(param)
        NavS("/Mainpage/Invoice/EditData")  
    break;
// view data
    default:
      view_data(param)
      setView_data_(true)
   
  }

}

// view data
const view_data = (param) =>{
  setData(
    {
      Customer_ID : param.id,
  // Customer name
      Customer_name: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_name)),
  
  // Customer email
      Customer_email: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_email)),
  
  // Customer cell
      Customer_cell: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_cell)),
  
  // Customer address
      Customer_address: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_address)),
  
  // Customer purchase
      Customer_purchase: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_purchase)),
  
  // Customer date
      Customer_date: Date(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_date)),
  
  // Customer total
      Customer_total: parseInt(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_total)),
  
  // Customer quantity
      Customer_Quantity: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_Quantity)),
  
  // Customer modeofpayment
      Customer_modepayment: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_modepayment)),
  
  // Customer payment
      Customer_payment: String(filtered.filter(index=>index.Customer_ID === param.id)
      .map(ge=>ge.Customer_payment)),
    }
  
  )
}

 // Edit customerdata
const edit_customerdata = (param) => {
  dataT = {
    Customer_ID : param.id,
// Customer name
    Customer_name: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_name)),

// Customer email
    Customer_email: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_email)),

// Customer cell
    Customer_cell: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_cell)),

// Customer address
    Customer_address: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_address)),

// Customer purchase
    Customer_purchase: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_purchase)),

// Customer date
    Customer_date: filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_date),

// Customer total
    Customer_total: parseInt(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_total)),

// Customer quantity
    Customer_Quantity: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_Quantity)),

// Customer modeofpayment
    Customer_modepayment: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_modepayment)),

// Customer payment
    Customer_payment: String(filtered.filter(index=>index.Customer_ID === param.id)
    .map(ge=>ge.Customer_payment)),
  }
  set_para_di_maedits = true

}

const [confirm_delete, setConfirm_delete] = useState(false)
const [view_data_, setView_data_] = useState(false)
  return (
    <div>
{/* Alert Successful delete */}
      <Collapse in={show_success}>
          <Alert severity="success"
          onClose={()=>{
            
            setShow_success(false) 
          }}
          >
            data succesful deleted
          </Alert>
        </Collapse>


      {/* Whole Container */}
        <Grid container>

{/* Confirm Delete Dialog */}
        <Dialog
        open={confirm_delete}
      >
        <DialogTitle>
          {"High Resolution"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
              are you sure you want delete this forever ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>

          <Button onClick={success_delete} autoFocus>
            Yes
          </Button>

          <Button onClick={e=>setConfirm_delete(false)} >No</Button>
        </DialogActions>
      </Dialog>

 {/* View Message Dialog */}
  
 <Dialog
  open={view_data_}
  >

{/* Dialog Tittle */}
      <DialogTitle >
                    <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding={2}
                >
        <Typography variant='h5'>
            High Resolution
        </Typography>
        </Grid>
      </DialogTitle>

{/* Dialog Content */}
      <DialogContent>

         {/* Customer name */}
         <Typography  variant='h6' marginTop={2} fontSize={15}>
           Name: 
         </Typography>
         <Typography variant='h6' fontSize={18}>
           {data.Customer_name}
         </Typography>

          {/* Customer email */}
          <Typography type='email' variant='h6' marginTop={2} fontSize={15}>
           Email: 
         </Typography>
         <Typography variant='h6' fontSize={18}>
           {data.Customer_email}
         </Typography>

          {/* Customer cell number */}
          <Typography variant='h6' marginTop={2} fontSize={15}>
           Contact number: 
         </Typography>
         <Typography variant='h6' fontSize={18}>
           {data.Customer_cell}
         </Typography>

          {/* Customer Address */}
          <Typography variant='h6' marginTop={2} fontSize={15}>
           Address: 
         </Typography>
         <Typography variant='h6' fontSize={18}>
           {data.Customer_address}
         </Typography>

          {/* Customer Date purchase */}
          <Typography variant='h6' marginTop={2} fontSize={15}>
           Date of purchase: 
         </Typography>
         <Typography variant='h6' fontSize={18}>
           {moment(data.Customer_date,"mm-dd-yyyy").format().split('T')[0]}
         </Typography>

          <Grid container spacing={2}>

            <Grid item>
              {/* Payment Status */}
              <Typography variant='h6' marginTop={2} fontSize={15}>
                Payment Status: 
              </Typography>
              <Typography variant='h6' fontSize={18}>
                {data.Customer_payment}
              </Typography>
            </Grid>

            <Grid item>
              {/* Payment Status */}
              <Typography variant='h6' marginTop={2} fontSize={15}>
                Mode of Payment: 
              </Typography>
              <Typography variant='h6' fontSize={18}>
                {data.Customer_modepayment}
              </Typography>
            </Grid>

          </Grid>

          
          <Grid container spacing={2}>

              <Grid item>
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                                 
                  <Typography variant='h6' marginTop={2} fontSize={15}>
                    Purchase list:
                  </Typography>
                  {test().map((e,i)=>
                  <ListItemText key={i}>
                      {e.Customer_purchase}
                  </ListItemText>)} 
                </Grid>

              </Grid>

              <Grid item>

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                <Typography variant='h6' marginTop={2} fontSize={15}>
                  Quantity:
                </Typography>
                {test().map((e,i)=>
                <ListItemText key={i}>
                    {e.Customer_Quantity}
                </ListItemText>)} 
                </Grid>
              </Grid>

              
            </Grid>
          {/* Customer Address */}
          <Typography variant='h6' marginTop={2} fontSize={15}>
           Total of Payment: 
         </Typography>

         <Typography variant='h6' fontSize={18}>
           {parseInt(data.Customer_total).toLocaleString(undefined, {maximumFractionDigits: 2})}
         </Typography>

        </DialogContent>

        <DialogActions>
          <Button 
         onClick={()=>{
          setView_data_(false)
         }}
             >
                    CLOSE
                </Button>
      </DialogActions>

    </Dialog>



        {/* Invoice */}
        <Grid  item xs={12} md={10}>
                <Typography variant='h3' marginY={2} marginLeft={2}> Invoice</Typography>
            </Grid>
        
{/* Search bar container */}
          <Grid item md={10} xs={12}>

          

            {/* Para may padding */}
           <Grid 
           container 
           padding={3}
           direction="row"
           justifyContent="center"
           alignItems="flex-start">

             {/* Search bar */}
              <CTextField 
              variant='standard' 
              fullWidth 
              placeholder='Searchbar'
              value={search}
              onChange={e=>setSearch(e.target.value)}
              disabled={Data ? false : true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
    
                    <SearchOutlinedIcon fontSize='large' />
                 
                  </InputAdornment>
                ),
              }}
              />

          
           </Grid>
         
    
          </Grid>

 {/* add button */}
          <Grid item md={1} xs={7} padding={3}>

              <Tooltip title="Add data">

              {/* Button add */}
                <Fab 
                color="primary" 
                aria-label="add" 
                // variant='extended'
                onClick={e=>NavS("/Mainpage/Invoice/AddData")} 
                >
                  <AddIcon />
                  {/* Add Item */}
                </Fab>
              </Tooltip>
          </Grid>


 {/* Show draft button */}
          <Grid item md={1} xs={7} padding={3}>

              <Tooltip title="Draft list">

              {/* Button add */}
                <Fab 
                color="primary" 
                aria-label="add" 
                onClick={e=>NavS("/Mainpage/Invoice/DraftList")} 
                // variant='extended'
                >
                  <DraftsOutlinedIcon />
                  {/* Draft List */}
                </Fab>
              </Tooltip>
          </Grid>

{/* Status */}
          <Grid item md={12}>
              {/* Container para may padding */}
            <Grid 
            container 
            paddingLeft={5}
            direction="row"
            justifyContent="flex-start"
            alignItems="center">

              {/* Radio Button for payment status */}
              <RadioGroup
              row
              value={stat}
              onChange={e => {
                setStat(e.target.value)
              }}
              
            >
              <FormControlLabel  disabled={Data ? false : true} value="Paid" control={<Radio />} label="Paid" />
              <FormControlLabel  disabled={Data ? false : true} value="Pending" control={<Radio />} label="Pending" />
            </RadioGroup>


            </Grid>
          </Grid>

              

          {/* Container for table */}
          <Grid item md={12}>
                      

            {/* Para may padding */}
            <Grid 
            container             
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            padding={5}>


<Typography variant='h6'>
  Click the row to view data
</Typography>
              {/* pang size at background color */}
              <Grid 
              container
              style={{
                height:550 ,
                width:'100%',
                backgroundColor: 'White',
                border:'2px solid black',
                borderRadius: 3               
              }}
              >


                {/* Data table */}
                <DataGrid
                columns={columns}
                getRowId={(rows)=> rows.Customer_ID}
                rows={filtered} // data na pinasok yung data 
                  
                pageSize={10}
                //delete_customerdata
                onCellClick={delete_customerdata}
                />
              </Grid>
 
          
            </Grid>

          </Grid>

 
        </Grid>

  
    </div>
  )
}

export default Invoice