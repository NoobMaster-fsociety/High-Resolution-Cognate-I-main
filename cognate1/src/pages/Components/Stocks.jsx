import { Alert, Autocomplete,OutlinedInput , Avatar, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { CTextField } from './products/Products'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios'
import styled from '@emotion/styled'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
// Custom TextField
export const CcTextField = styled(TextField)({
  '& .MuiInputBase-input': {

    position: 'relative',
    fontSize: 20,
    padding: '12px',

  },
  "label":{
    color: "#000000"

  },
  "& .MuiOutlinedInput-root.Mui-disabled": {
    "&  fieldset": {
      
      borderColor: "#FFFFFF",
      
    },
    "& text": {
      color: "#000000"
    }

  },
  "& label.Mui-focused": {
    color: "#9B3C21"
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid #000000",
    },
    "&.Mui-focused fieldset": {

      border: "2px solid #9B3C21"
    }
  }
});


//MAIN FUNCTION
const Stocks = () => {


//Consta for table
const [list_data, setList_data] = useState(true)

// Columns
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

  // Product Name
  { field: 'Product_name', 
    headerName: 'Product_name', 
    width: 300,
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
    // Edit
    {
      field: 'action',
      headerName: 'Action',
      width: 125,
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
           
          <IconButton 
          color="primary" 
          aria-label="edit">
              <ModeEditOutlinedIcon/>
          </IconButton>
           
  
          </div>


        );
      }
    }
];


 
//Data
const [Data,setData] = useState()

//search data variable
const [search,setSearch] = useState("") 


// Filtering data 
const filtered = !search ? 
Data 
: Data?.filter((person) => 
    person.Product_name.toLowerCase().includes(search.toLowerCase())
  );


  //JSON DATA
const [productData,setProductData] = useState( 
  {
  "Product_ID": 0,
  "Product_image": "",
  "Product_name": "" ,
  "Product_category": "",
  "Product_stocks": 0,
  "Product_price": 0,
  "Product_Status" : ""
})

const [setTrue, setSetTrue] = useState(true)
const [list_stocks,setList_stocks] = useState()
const [show_dia,setShow_dia] =  useState(false)

const [cancel_api,setCancelApi] = useState(true)
// http request api
  useEffect(() => {
    let api = true
      axios.get('http://localhost/REACTJS/cognate1%20api/ProductdataAPI.php')
    .then(res=>
      {
        if (cancel_api)
        {
          try
          {
            [...res.data]?.filter(e=>e.Product_name) ? console.log("meron") : console.Console("wala")
          }catch(e){
            console.log("wala talag")
          }

      
        setData(res.data)
        if (setTrue)
        {
          try{

          // console.log("run")
          if ([...res.data]?.filter(e=>e.Product_stocks <= 0).length === 0){
            setShow_dia(false)
          }else{
            setList_stocks([...res.data]?.filter(e=>e.Product_stocks <= 0).map(e=>e.Product_name))
            setShow_dia(true)
  
          }
        }
          catch(e){
            console.log(e)
          }
        }
      }
      }
      )
    .catch(err=>console.log(err)) 

    return () => setCancelApi(false)
 })

const [choice,setChoice] = useState([])

const [cancelcat,setCancelcat] = useState(false)

 useEffect(() => {


  axios.get("http://localhost/REACTJS/cognate1%20api/category.php")
  .then(res=>{
    if (cancelcat)
    {
      setChoice(res.data?.map(e=>e.category))
    }
  }
  ).catch(err=>setCancelcat(false))

  return () => setCancelcat(false)
  
});

//  Update button
 const update = () =>{
  setLogin({...login, 
    password: ""})
   axios.put('http://localhost/REACTJS/cognate1%20api/Update_ProductdataAPI.php',productData)
   .then(res=>{

    setList_data(res.data[0].Result)
    setShow(res.data[0].Result)
    setErRor(res.data[0].Result)
    setDialog(false)
    setCancelApi(true)
    setCancelcat(false)  
   })

}

const [show,setShow] = useState(false)
const [erRor,setErRor] = useState()

// Password
const [errors,setErrors] = useState(true)

// Show message Dialog
const [dialog,setDialog] = useState(false)

// Set data
const [login,setLogin] = useState({
  "email": "",
  "password" : "",
  "sec1": null,
  "sec2": null
})

  // Set verification
  const veri_password = e => {
   
    e.preventDefault()



    axios.post('http://localhost/REACTJS/cognate1%20api/LoginAPI.php', login)
    .then(res=>
      {
   
        res.data[0].Result ? update() : setErrors(res.data[0].Result) 
        setErrors(res.data[0].Result)

      }
    )

  }

  // set email
const setemail = e => {
  
  axios.get('http://localhost/REACTJS/cognate1%20api/View_LoginAPI.php')
  .then(res=>
    {
      setLogin({...login, email: res.data[0].email})
     
    }
  )
}

  return (

    <div>


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

      
<Dialog
  open={dialog}
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
         Please review of the following: 
        </Typography>

    {/* Confirm Textbox */}


         {/* Textfield product name */}
         <CcTextField
         size='small'
         margin='normal'
          fullWidth 
          value={productData.Product_name}
          onChange={e => setProductData({...productData,Product_name: e.target.value })}
         />

        {/* Textfield Product category */}
          <CcTextField 
          size='small'
         margin='normal'
          fullWidth 
          value={productData.Product_category}
         onChange={e=> {setProductData({...productData, Product_category: e.target.value})}}
          />


          {/* Textfield Product stocks */}
          <CcTextField
         size='small'
         margin='normal'
          type='number' 
          fullWidth 

          value={
            productData.Product_stocks
          }
          onChange={e => setProductData({...productData, Product_stocks: parseInt(e.target.value) })}
          
          
          />

          {/* Textfield Product price */}
          <CcTextField 
         size='small'
         margin='normal'
          type='number' 
          fullWidth 

          
          value={
            productData.Product_price 
          }

          onChange={e => setProductData({...productData, Product_price: parseInt(e.target.value) })}

          />

          {/* Textfield Product price */}
          <CcTextField 
         size='small'
         margin='normal'
          type='text' 
          fullWidth 

          
          value={
            productData.Product_Status
          }

          onChange={e => setProductData({...productData, Product_Status: String(e.target.value) })}

          />



        <TextField 
  
        error={!errors ? true : false }
        helperText={!errors ? "Password are incorrect" : ""}
        fullWidth 
        label='Password'
        type='password' 
        placeholder='Please input your password ' 
        variant="outlined" 
        margin="normal"
        value = {login.password}
        onChange = {e => setLogin({...login, password: e.target.value})}
        />    
                
      </DialogContent>

      <DialogActions>
          <Button 
          onClick={veri_password} 
          autoFocus >Okay</Button>

          <Button 
         onClick={()=>{
          setDialog(false)
          setErrors(true)
          setLogin({email: "", 
          password: ""})

         }}
           

          //   setOpenDialog(false)
          //   setErrors(true)}}
             >
                    Cancel
                </Button>
      </DialogActions>

    </Dialog>

      <Grid>

{/* Alert Success */}
      <Collapse in={show}>
          <Alert  severity="success"
          onClose={()=>setShow(false)}
          >
            Data has been added
          </Alert>
        </Collapse>

{/* Alert Error */}
        <Collapse in={erRor ? false : true}>

        <Alert severity="error"
        onClose={()=>setErRor(true)}> 
            please fill out the empty input products 
          </Alert>

        </Collapse>

        {/* Stocks */}
        <Grid container item xs={12} md={10}>
                <Typography variant='h3' marginY={2} marginLeft={2}> Stocks</Typography>
            </Grid>


        {/* Search bar */}
        <Grid item md={12} padding={2}>


          <Grid

          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{
            backgroundColor:'white',
            border: '2px solid black',
            borderRadius: '5px'
          }}
          padding={2}>


         {/* Search bar */}
          <CTextField 
          fullWidth 
          value = {search} 
          onChange={e =>{ 
            setList_data(true)
            setSearch(e.target.value)}}  
          placeholder='Search by product name' 
          variant='standard'
          margin='normal'
          disabled={ !Data ? true : false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
      
                <SearchOutlinedIcon fontSize='large' />
             
              </InputAdornment>
            ),
          }}
          onClick={e=>
            {
              e.preventDefault();
             setList_data(true)       
            }}
             
          />

             {/* Button bar */}
            <Button variant='contained'
            disabled={Data ? false : true}
            onClick={e=>
            {
              e.preventDefault();
              list_data ? setList_data(false) : setList_data(true)  
              setCancelApi(true)
              setCancelcat(false)    
            }}> {!list_data ? "Show Data List" : "Show edit product"}</Button>
          </Grid>

        </Grid>
      
{/* Datable container */}
      <Grid item md={12} padding={2}>

      <Collapse in={list_data}> {/* Pang collapse */}
        
        <Grid
        container

        direction="row"
        justifyContent="center"
        alignItems="center"
      
        padding={2}>

          <Box
          sx={{
            backgroundColor:'white',
            border:'2px solid #9B3C21',
            borderRadius: 2,
            height: 550,
            width: 500,
          }}
         >
          

{/* DATA GRID TABLE */}
            <DataGrid
              columns={columns}
              
              rows={filtered} // data na pinasok yung data 
              getRowId={(rows4)=> rows4.Product_ID}
              pageSize={10}

              onCellClick={
                (param)=>{
                  if (param.field === "action"){
                    
                   // setProductData({...productData, Product_ID: parseInt(param.id)})
                    setProductData({
                      // Product ID
                      Product_ID: parseInt(param.id),

                      // Product Image
                      Product_image: String(Data?.filter(index=>index.Product_ID === param.id)
                      .map(ge=>ge.Product_image)),

                      // Product Name
                      Product_name: String(filtered?.filter(index=>index.Product_ID === param.id)
                      .map(ge=>ge.Product_name)),

                      // Product Category
                      Product_category: String(filtered?.filter(index=>index.Product_ID === param.id)
                      .map(ge=>ge.Product_category)),

                      // Product Stocks
                      Product_stocks: parseInt(filtered?.filter(index=>index.Product_ID === param.id)
                      .map(ge=>ge.Product_stocks)),

                      
                      // Product Price
                      Product_price:  parseInt(filtered?.filter(index=>index.Product_ID === param.id)
                      .map(ge=>ge.Product_price)),

                      // Product Status
                      Product_Status:  String(filtered?.filter(index=>index.Product_ID === param.id)
                      .map(ge=>ge.Product_Status)),


                    })
                    setemail()
                    setList_data(false) 
                    setCancelApi(false)
                    setCancelcat(true)
                  }
                }       
              }

            />

            
          </Box>
           
        </Grid>
      </Collapse> 
    
    </Grid>

   <Collapse in={list_data ? false : true}>

    <Grid item md={12} padding={2}>

      <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      padding={2}
      style={{
        backgroundColor:'white',
        border:'2px solid black'
      }}>

         {/* Upload Image */}
         <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  padding={2}
                  spacing={2}
                >

                  <Grid item>

                    {/* IMAGE */}
                    <Avatar
                      
                      src={productData.Product_image}
                      sx={{ width: 200, height: 200 , border: '2px solid black'}}
                    />
                  </Grid>
         
                  <Grid item>
                      <CcTextField  
                      type='file' 
                      // value={create.Product_image}
                      onChange={e=>{
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(e.target.files[0]);
                      
                        fileReader.onload = (event) => {
                        
                          setProductData({...productData, Product_image: event.target.result})
                           }
                      }}
                      


                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EditIcon/>
    
                          </InputAdornment>
                        ),
                      }}
                      
                      />
                  </Grid>
                </Grid>


{/* Container Product name */}
        <Grid item md={6} xs={12} >
          
          {/* Label product name */}
          <Typography variant='h6' margin={1}>Product name</Typography>

         {/* Textfield product name */}
          <CcTextField
          fullWidth 
          value={productData.Product_name}
          onChange={e => setProductData({...productData,Product_name: e.target.value })}
         />



        </Grid>

{/* Container Product Category */}
        <Grid item md={6} xs={12}>
         
        {/* Label product Category */}
          <Typography variant='h6' margin={1}>Product Category</Typography>

        {/* Textfield Product category */}
          {/* <CcTextField 
          fullWidth 
          value={productData.Product_category}
         onChange={e=> {setProductData({...productData, Product_category: e.target.value})}}
          /> */}

<Autocomplete
        
        freeSolo
        disablePortal
        
        options={choice}
        value = {productData.Product_category}
        onChange = {(e, value) => setProductData({...productData, Product_category: value})}

        // onChange={(event, value) => setCategory(value)}
        sx={{
          width: 400
        }}
        renderInput={
          (params) =>

          // Textfield
          <CcTextField
          {...params}
          fullWidth
          value = {productData.Product_category}
          onChange={e=> {setProductData({...productData, Product_category: e.target.value})}}

          type='text' 
          placeholder='Input product category'
          variant="outlined" 
          margin="normal"/>} 
          onClick={()=>setemail()}
          /> 

    
        </Grid>

{/* Container Product stocks */}
        <Grid item md={6} xs={12}>

          {/* Label product name */}
          <Typography variant='h6' margin={1}>Product Stocks</Typography>

          {/* Textfield Product stocks */}
          <CcTextField 
          type='number' 
          fullWidth 

          value={
            productData.Product_stocks
          }
          onChange={e => setProductData({...productData, Product_stocks: parseInt(e.target.value) })}
          
          
          />

        </Grid>

{/* Container Product price */}
        <Grid item md={6} xs={12}>

          {/* Label product name */}
          <Typography variant='h6' margin={1}>Product Price</Typography>

          {/* Textfield Product price */}
          <CcTextField 
          type='number' 
          fullWidth 

          
          value={
            productData.Product_price 
          }

          onChange={e => setProductData({...productData, Product_price: parseInt(e.target.value) })}

          />

        </Grid>
        
{/* Container Product Status */}
<Grid item md={12} xs={12}>
   
           <Typography variant='h6' margin={1}>Product Status</Typography>
 
 
        <Select

          fullWidth
          value={productData.Product_Status}
          onChange={e=> {setProductData({...productData, Product_Status: e.target.value})}}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{
            width: 400
          }}
        >
          <MenuItem
              // key={name}
              value="Available"

            >
              Available
            </MenuItem>
            <MenuItem
              // key={name}
              value="Not Available"

            >
              Not Available
            </MenuItem>
  
            
        </Select>
     
         </Grid>

{/* UPDATE BUTTON */}
        <Grid item>
          <Button variant='contained' 
          onClick={()=>setDialog(true)}
          
          > Update</Button>
        </Grid >

        


      </Grid>
     
      
    </Grid>

   
         
    </Collapse>
    

  </Grid>




    </div>
  )
}

export default Stocks