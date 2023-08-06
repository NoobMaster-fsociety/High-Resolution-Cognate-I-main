import { Autocomplete, Avatar, Box, Button,  Dialog,  DialogActions,  DialogContent,  DialogTitle,  Grid,  Hidden,  InputAdornment,  TextField, Typography} from '@mui/material'
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';


import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import EditIcon from '@mui/icons-material/Edit';

import Default_Image from './image.png'

// Custom TextField
const CTextField = styled(TextField)({
  '& .MuiInputBase-input': {

    position: 'relative',
    fontSize: 20,
    padding: '12px',

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


const Add_item = () => {

  ///Data
  const [Data,setData]= useState([])



const [show_alertfal,setShow_alertfal] = useState()
const [show_alert,setShow_alert] = useState()
const [mensahe, setMensahe] = useState()

//Json create

const [create, setCreate] = useState({
  "Product_image" : Default_Image,
  "Product_name" : "",
  "Product_category" : "",
  "Product_stocks" : 0,
  "Product_price" : 0,
  "Product_Status": "Available"
})

useEffect(() => {
  let api = true
  axios.get("http://localhost/REACTJS/cognate1%20api/category.php")
  .then(res=>{
    if (api)
    {
      setData(res.data?.map(e=>e.category))
    }

     // setData(res.data)
    
  }
  )

  return () => api = false
  
});

const create_submit = () => {

  // console.log(create)
  axios.post("http://localhost/REACTJS/cognate1%20api/Create_productdataAPI.php", create)
  .then(res=>
    {

      setShow_alert(res.data[0].Result)
      setShow_alertfal(res.data[0].Result)
      setDialog(false)
      setMensahe(res.data[0].Message)
      console.log(res.data)
      
    }
  )


}
let nav = useNavigate()

// Show message Dialog
const [dialog,setDialog] = useState(false)

// Set data
const [login,setLogin] = useState({
  "email": "",
  "password" : "",
  "sec1": null,
  "sec2": null
})

// set email
const setemail = e => {
  
  axios.get('http://localhost/REACTJS/cognate1%20api/View_LoginAPI.php')
  .then(res=>
    {
      setLogin({...login, email: res.data[0].email})
     
    }
  )
 
}



  // Password
const [errors,setErrors] = useState(true)

// Set verification
const veri_password = e => {
  e.preventDefault()
  axios.post('http://localhost/REACTJS/cognate1%20api/LoginAPI.php', login)
  .then(res=>
    {
      res.data[0].Result ? create_submit() : setErrors(res.data[0].Result) 
      setErrors(res.data[0].Result)

    }
  )

}

const [disble,setDisble] = useState(false)
  return (
    <div>

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

        <TextField
        size='small'
        label='Product name'
        fullWidth 
        type='text' 
        placeholder='Input product name' 
        variant="outlined" 
        margin="normal"
        value = {create.Product_name}
        onChange = {e => setCreate({...create, Product_name: e.target.value})}/>

        <Autocomplete
        size='small'
        label='Product category'
        freeSolo
        disablePortal
        options={Data}
        value = {create.Product_category}
        onChange = {(e, value) => setCreate({...create, Product_category: value})}
 
          // onChange={(event, value) => setCategory(value)}
          sx={{
              width: 400
          }}
          renderInput={
            (params) =>

              // Textfield
            <TextField
            {...params}
                   
            value = {create.Product_category}
            onChange = {e => setCreate({...create, Product_category: e.target.value})}
   
            type='text' 
            placeholder='Input product category'
            variant="outlined" 
            margin="normal"/>} /> 


        <TextField 
        size='small'
        label='Product stocks'
        fullWidth 
        type='number' 
        placeholder='Input product stocks' 
        variant="outlined" 
        margin="normal"
        value = {create.Product_stocks}
        onChange = {e => setCreate({...create, Product_stocks: e.target.value})}
        />

        <TextField 
        size='small'
        label='Product price'
        fullWidth 
        type='number' 
        placeholder='Input product price' 
        variant="outlined" 
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <p>Php</p>
                   
            </InputAdornment>
            ),
          }}
        value = {create.Product_price}
        onChange = {e => setCreate({...create, Product_price: e.target.value})}
                  />
                  





        <CTextField 
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
          setLogin({...login , password: ""})
          setDisble(false)

         }}
           
             >
                    Cancel
                </Button>
      </DialogActions>

    </Dialog>
  {/* show when success  */}
      <Collapse in={show_alert}>

        <Alert  severity="success"
           onClose={()=>{
             setShow_alert(false)
             setCreate({
              Product_image:Default_Image,
               Product_name:"",
               Product_category:"",
               Product_stocks:0,
               Product_price:0,
               Product_Status: "Available"
             })
             setLogin({...login , password: ""})
             setDisble(false)
             }}>
           Data has been added
        </Alert>

      </Collapse>

      {/* show when error  */}
      <Collapse in={show_alertfal ? false : true}>

      <Alert  severity="error"
        onClose={()=>{
          setShow_alertfal(true)
          setLogin({...login , password: ""})
          setDisble(false)
          }}>
          {mensahe ? mensahe : "Product name and Product category should not empty" }
        
      </Alert>

      </Collapse>





      {/* WHOLE CONTAINER LOADS */}
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="center">


  {/* Add Item */}

          <Typography marginTop= {15} variant='h3'> Add new item</Typography>
      
      
  {/* container inputs */}
        <Grid
        item
          container
          direction="row"
          justifyContent="center"
          alignItems="center">

{/* isa pang container para maayos ang margin */}
          <Grid
          container
          marginY={2}
          marginLeft={5}
          marginRight={2}
          direction="row"
          justifyContent="center"
          alignItems="center">


            <Grid container
            margin={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{
              width:800,
              border: '2px solid black',
              borderRadius: '8px',
              backgroundColor: 'white'
                 }}
            >

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
                      
                      src={create.Product_image}
                      sx={{ width: 200, height: 200 , border: '2px solid black'}}
                      
                     // marginBottom={2}
                    />
                  </Grid>
         
                  <Grid item>
                      <CTextField  
                      type='file' 
                      // value={create.Product_image}
                      onChange={e=>{
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(e.target.files[0]);
                      
                        fileReader.onload = (event) => {
                        
                          setCreate({...create, Product_image: event.target.result})
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
           



          {/* Label Productname */}
              <Grid container  item md={5} justifyContent="center" margin={2}>
                 <Typography 
                 variant='h5'
                 >Product name</Typography>
              </Grid>

          {/* Input Productname*/}
              <Grid item md={6} marginX={1}>

              <CTextField 
                fullWidth 
                type='text' 
                placeholder='Input product name' 
                variant="outlined" 
                margin="normal"
                value = {create.Product_name}
                onChange = {e => setCreate({...create, Product_name: e.target.value})}
                onClick={()=>setemail()}
                />


              </Grid>


{/* ////////////////////////////////////////////////////////// */}

  {/* Label Productname */}
              <Grid container item md={5} justifyContent="center" margin={2}>
                 <Typography  variant='h5'>Product Category</Typography>
              </Grid>

  {/* Input Product Category */}
              <Grid item md={6} marginX={1}>


                <Autocomplete
        
                freeSolo
                disablePortal
                
                options={Data}
                value = {create.Product_category}
                onChange = {(e, value) => setCreate({...create, Product_category: value})}
 
                // onChange={(event, value) => setCategory(value)}
                sx={{
                  width: 400
                }}
                renderInput={
                  (params) =>

                  // Textfield
                  <CTextField
                  {...params}
                   
                  value = {create.Product_category}
                  onChange = {e => setCreate({...create, Product_category: e.target.value})}
   
                  type='text' 
                  placeholder='Input product category'
                  variant="outlined" 
                  margin="normal"/>} 
                  onClick={()=>setemail()}
                  /> 

        
              </Grid>

{/* ////////////////////////////////////////////////////////// */}

     
          {/* Label Productstocks */}
          <Grid container  item md={5} justifyContent="center" margin={2}>
                 <Typography  variant='h5'>Product Stocks</Typography>
              </Grid>

          {/* Input Productstocks*/}
              <Grid item md={6} marginX={1}>
                <CTextField 
                fullWidth 
                type='number' 
                placeholder='Input product stocks' 
                variant="outlined" 
                margin="normal"
                value = {create.Product_stocks}
                onChange = {e => setCreate({...create, Product_stocks: e.target.value})}
                onClick={()=>setemail()}
                />


                
              </Grid>



{/* ////////////////////////////////////////////////////////// */}   

      {/* Label Product price */}
              <Grid container  item md={5} justifyContent="center" margin={2}>
                 <Typography  variant='h5'>Product Price</Typography>
              </Grid>

      {/* Input Product product*/}
              <Grid item md={6} marginTop={1} marginBottom={2}>
                <CTextField 
                fullWidth 
                type='number' 
                placeholder='Input product price' 
                variant="outlined" 
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <p>Php</p>
                   
                    </InputAdornment>
                  ),
                }}
                value = {create.Product_price}
                onChange = {e => setCreate({...create, Product_price: e.target.value})}
                onClick={()=>setemail()}
                />
                          </Grid>




            </Grid>
            


                  </Grid>


              













          <Grid item margin={1}>
            
            <Button
            variant='contained'  
            onClick={()=>{
              setDialog(true)
              setDisble(true)
    
             }}
             disabled={disble}
            style={{
              borderRadius: '10px',
              width:200,
              marginBottom:10,
              padding:10,
           
            }}> create </Button>

          </Grid>

          <Grid item margin={1}>
            <Button 
            variant='contained'  
            onClick={e=>{e.preventDefault(); nav("/Mainpage/Products")}}
            style={{
            borderRadius: '10px',
            width:200,
            marginBottom:10,
            padding:10,
     
          }}> cancel </Button>

          </Grid>

        </Grid>

      </Grid>
      
    </div>
  )
}

export default Add_item










