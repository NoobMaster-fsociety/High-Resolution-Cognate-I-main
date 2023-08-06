import { 

  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab, 
  Grid, 
  IconButton, 
  InputAdornment, 

  SpeedDial, 

  SpeedDialAction, 

  TextField, 
  Tooltip, 
  Typography ,

} from '@mui/material'

import { styled } from '@mui/material/styles';
import {React , useEffect, useState }from 'react';
import axios from 'axios';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

//npm i @mui/x-data-grid
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate } from 'react-router-dom';
import { CcTextField } from '../Stocks';






export const CTextField = styled(TextField)({
  '& .MuiInputBase-input': {

    position: 'relative',
    fontSize: 20,
    padding: '10px 12px',

  },

})

const actions = [
  { icon: <AddIcon />, name: 'Add item' },
  { icon: <ArchiveOutlinedIcon />, name: 'Save' },
];


// MAIN FUNCTIOM 
const Products = () => {



let NavS = useNavigate();

// Category data variable
const [category, setCategory] = useState("None")

//Data from API
const [Data,setData] = useState() 

// Data from Login

const [login,setLogin] = useState({
  "email": "",
  "password" : "",
  "sec1": null,
  "sec2": null
})

//search data variable
const [search,setSearch] = useState("") 


// Filtering data 
const filtered = !search ? 
Data 
: Data?.filter((person) => 
    person.Product_name.toLowerCase().includes(search.toLowerCase())
  );

  // http request api


  const [setTrue, setSetTrue] = useState(true)
  const [list_stocks,setList_stocks] = useState()
  const [show_dia,setShow_dia] =  useState(false)
useEffect(() => {
  let api = true
  axios.get('http://localhost/REACTJS/cognate1%20api/ProductdataAPI.php')
  .then(res=>{
    if (api)
    {
      [...res.data]?.filter(e=>e.Product_name) ? console.log("may laman") : console.log("wala")
      setData(res.data)

      if (setTrue)
      {
        // console.log("run")
        if ([...res.data]?.filter(e=>e.Product_stocks <= 0).length === 0){
          setShow_dia(false)
        }else{
          setList_stocks([...res.data]?.filter(e=>e.Product_stocks <= 0).map(e=>e.Product_name))
          setShow_dia(true)

        }
      }


        // [...res.data]?.filter(e=>e.Product_stocks <= 0).length === 0 ?
        // setAlert_stocks(false) : setAlert_stocks(true) 
    }

    
  }
    

    
    )

 return () => api = false
  });

  // Password
  const [errors,setErrors] = useState(true)

  // Show Alert

  const [show_success,setShow_success] = useState()

  // Delete product data
const delete_product = () => {

    axios.post("http://localhost/REACTJS/cognate1%20api/Delete_productdataAPI.php", { "Product_ID": productID } )
    .then(res => {

      setOpenDialog(false)
      setShow_success(res.data[0].Result)
      
    }
    )
    setLogin({...login , password: ""})
}

const verification_delete = e =>{
  e.preventDefault()


  axios.post('http://localhost/REACTJS/cognate1%20api/LoginAPI.php', login)
  .then(res=>{
    console.log(res.data)
    if (res.data[0].Result)
    {
      delete_product() 
      setErrors(res.data[0].Result)
    }else{
      setErrors(res.data[0].Result)
    }
    
  }
  )
}

// product ID
const [openDialog,setOpenDialog] = useState(false)

// product ID
const [productID,setProductID] = useState(false)

// Open dialog
const open_dialog = (param) => {

  axios.get('http://localhost/REACTJS/cognate1%20api/View_LoginAPI.php')
  .then(res=>setLogin({...login, email: res.data[0].email}))
  

  if(param.field === "action")
  {
    setProductID(param.id)
    setOpenDialog(true)
  }
 
}


// Column header

  const columns = [


    // ID Column
    { field: 'Product_ID', 
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
    { field: 'Product_name', 
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

    { field: 'Product_category', 
      headerName: 'category', 
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

    { field: 'Product_stocks', 
      headerName: 'stocks ', 
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

    { field: 'Product_price', 
      headerName: 'price', 
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
      headerName: 'Action',
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
    }

  ];
 
  return (
    <div>
{/* Alert Success */}
<Collapse in={show_success}>
          <Alert severity="success"
          onClose={()=>{
            
            setShow_success(false) 
          }}
          >
            Data has been succesfully move to archive
          </Alert>
</Collapse>
{/* Whole Container  */}
<Grid container spacing={2}>


{/* Restock notification!*/}

<Dialog
        open={show_dia}
      >
        {/* Dialog Tittle */}
      <DialogTitle>
      Please restock of the follwing!
      </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {"Product: " + list_stocks}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={()=>{
            setSetTrue(false)
            setShow_dia(false)
          }} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

  {/* Message Dialog */}
  <Dialog
  open={openDialog}
  >


{/* Dialog Tittle */}
      <DialogTitle>
        <Typography variant='h5'>
                    High Resolution
        </Typography>
      </DialogTitle>

{/* Dialog Content */}
      <DialogContent>

        <Typography variant='body1'>
          Are you sure you want to move this into archive ?
        </Typography>

    {/* Message Textbox */}
        <TextField 
        type='password' 
        fullWidth 
        placeholder='If do, please type your password' 
        fontSize={9} 
        size='small' 
        margin='normal'
        value={login.password}
        error={errors ? false : true}
        helperText={errors ? "" : "very wrong"}
        onChange={e=>setLogin({...login,password: e.target.value})}
        />
                
      </DialogContent>

      <DialogActions>
          <Button onClick={verification_delete} autoFocus >Okay</Button>
          <Button onClick={()=>{
            setLogin({email: "", 
            password: ""})
            setOpenDialog(false)
            setErrors(true)}} >
                    Cancel
                </Button>
      </DialogActions>

    </Dialog>

{/* Products */}
    <Grid container item xs={12} md={10}>
      <Typography variant='h3' marginY={2} marginLeft={2}> Products</Typography>
    </Grid>

{/* Button container style */}
    <Grid container item xs={12} md={2} >

{/* Button container para may margin na maayos */}
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        margin={2}
        spacing={2}>

            <Grid item>

{/*add item */}

            <Tooltip title="Add Item">
              <Fab color="primary" aria-label="add" onClick={e=>NavS("/Mainpage/Products/AddItem")} >
                <SpeedDialIcon />
              </Fab>
            </Tooltip>  

            </Grid>
            
{/* Show archive*/}
            <Grid item>

            <Tooltip title="Show archive">

              <Fab color="primary"  aria-label="add" onClick={e=>NavS("/Mainpage/Products/ArchiveList")} >
                  <ArchiveOutlinedIcon />
              </Fab>

            </Tooltip> 
            </Grid>





        </Grid>

    </Grid>

{/* Search bar and data container */}
    <Grid
      container
      item
      xs={12}
      direction="row"
      justifyContent="center"
      alignItems="flex-start">

      {/* Container para maayos ang margin */}
        <Grid container item xs={12} marginLeft={3} marginRight={3} style={{width: '1000'}}>

   {/* Search bar */}
          <CTextField 
          fullWidth 
          value = {search} 
          onChange={e => setSearch(e.target.value)}  
          placeholder='Search by product name' 
          variant='standard'
          disabled={Data? false : true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">

                <SearchOutlinedIcon fontSize='large' />
             
              </InputAdornment>
            ),
          }}
          
          
          />

   {/* CATEGORY STOCKS */}
          <Grid container item xs={2} md={1} margin={2}>
          {/* <Select
          value={category}
          label="category"
          defaultValue="{category}"
          onChange={e => setCategory(e.target.value)}  
          
        >

          <MenuItem >Ten</MenuItem>
          <MenuItem  >Twenty</MenuItem>
          <MenuItem>Thirty</MenuItem>
        </Select> */}

          </Grid>
         
          {/* Datagrid */}
          <Grid
          container
          marginLeft={2}
          marginRight={4}
          marginBottom={3}
          style={{
          height:550 ,
          width:'100%',
          backgroundColor: 'White',
          border:'2px solid black',
          
          
          }}>

               <DataGrid
                  columns={columns}
                  getRowId={(rows)=> rows.Product_ID}
                  rows={filtered} // data na pinasok yung data 
                  
                  pageSize={10}
                  onCellClick={open_dialog}
                />

               
    
        </Grid>
        
      </Grid>

    
    </Grid> 
    

          
</Grid>


        
    </div>
  )
}

export default Products