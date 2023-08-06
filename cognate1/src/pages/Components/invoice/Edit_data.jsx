import { 
    Fab, 
    Grid , 
    Typography, 
    Box, 
    Button, 
    FormControlLabel, 
    Alert, 
    Collapse, 
    Radio, 
    RadioGroup, 
    Select, 
    Chip, 
    MenuItem, 
    ListItemText,
  } from '@mui/material'
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogTitle from '@mui/material/DialogTitle';
  import React, { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  import { CcTextField } from '../Stocks';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import LocalizationProvider from '@mui/lab/LocalizationProvider';
  import MobileDatePicker from '@mui/lab/MobileDatePicker'
  import moment from 'moment'
  
  
  // ICONS
  import ClearIcon from '@mui/icons-material/Clear';
  import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
  import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
  import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

  import { dataT , set_para_di_maedits } from './Invoice'
  
  import axios from 'axios';



var para_de_maedit = set_para_di_maedits
  
  const Edit_data = () => {
  // Routes
    let NavS = useNavigate();
  const [not_edit,setNot_edit] = useState(set_para_di_maedits)
  
  // PDF create
  const createPDf = e => {
    e.preventDefault()
  }
  
  // Date ITO
  const [value,setValue] = useState(
    new Date()
  )
    //JSON
    const [data, setData] = useState(
        {
        "Customer_ID" : 0,
        "Customer_name": "",
        "Customer_email": "",
        "Customer_cell": "",
        "Customer_address": "",
        "Customer_purchase": "", //ito0
        "Customer_date": "",
        "Customer_total": 9,
        "Customer_Quantity": "", //ito0
        "Customer_modepayment": "",
        "Customer_payment": ""
        },)
    // Mode of payment
    const [ModeP, setModeP] = React.useState('COD');
    
  // Show success
  const [show_success,setShow_success] = useState()
  
  // Show error
  const [show_error,setShow_error] = useState(true)
  
  // Show error show
  const [show_err,setShow_err] = useState()
  
  // Product purchase
  const [selectname, setSelectname] = useState("Select Product")
  
  // Message if data exist
  const [Msg,setMsg] = useState("")
 
  
  const date_ito = new Date(value)



  
  const [email, setEmail]= useState(true)

  const verify_email = e =>{
  
    e.preventDefault()
    
    axios.post('http://localhost:3001/updatedEmail',{
      "Email" : data.Customer_email,
      "Message" : String(test.map(e=>e.Customer_purchase)),
      "Name" : data.Customer_name,
      "Date" : moment(date_ito,"mm-dd-yyyy").format().split('T')[0],
      "Total" : parseInt(test.reduce((a,b)=> a = a + b.Customer_total,0)),
      "Mode" : String(ModeP),
      "Status" : data.Customer_payment
    }) 
    .then(
      res => 
      {
        setEmail(res.data.Return)
        console.log(res.data)
      }
    )
  
  }
  


  // Add customer data
  const edit_customerdata = e => {
  
    e.preventDefault()  
  
    
    axios.post("http://localhost/REACTJS/cognate1%20api/Update_CustomerdataAPI.php", {
      "Customer_ID": data.Customer_ID,
      "Customer_name": data.Customer_name,
      "Customer_email": data.Customer_email,
      "Customer_cell": data.Customer_cell,
      "Customer_address": data.Customer_address,
      "Customer_purchase": String(test.map(e=>e.Customer_purchase)),
      "Customer_date": moment(date_ito,"mm-dd-yyyy").format().split('T')[0],
      "Customer_total": parseInt(test.reduce((a,b)=> a = a + b.Customer_total,0)),
      "Customer_Quantity": String(test.map(e=>e.Customer_Quantity)),
      "Customer_modepayment": String(ModeP),
      "Customer_payment":  data.Customer_payment
    })
    .then(res => 
      {
        setShow_success(res.data[0].Result)
        setShow_error(res.data[0].Result)
        setShow_err(res.data[0].Result)
        setMsg(res.data[0].Message)
        console.log(res.data)
        setOpenDialog(false)
      })
      setDisble(true)
  
    }
  
      // ,MOve to draflist
  const Move_customerdata = e => {
  
    e.preventDefault()  
  
    
    axios.post("http://localhost/REACTJS/cognate1%20api/Create_customer_Save_to_draftAPI.php", {
      "Customer_ID": data.Customer_ID,
      "Customer_name": data.Customer_name,
      "Customer_email": data.Customer_email,
      "Customer_cell": data.Customer_cell,
      "Customer_address": data.Customer_address,
      "Customer_purchase": String(test.map(e=>e.Customer_purchase)),
      "Customer_date": moment(date_ito,"mm-dd-yyyy").format().split('T')[0],
      "Customer_total": parseInt(test.reduce((a,b)=> a = a + b.Customer_total,0)),
      "Customer_Quantity": String(test.map(e=>e.Customer_Quantity)),
      "Customer_modepayment": String(ModeP),
      "Customer_payment":  data.Customer_payment
    })
    .then(res => 
      {
        setShow_success(res.data[0].Result)
        setShow_error(res.data[0].Result)
        setShow_err(res.data[0].Result)
        setMsg(res.data[0].Message)
        console.log(res.data)
        setOpenDialog(false)
      })
      setDisble(true)
  
    }
  
  // Data product
  const [dataproduct,setDataproduct] = useState([])
    
  

  // fetch name 
  useEffect(() => {
  
  let isApiSubscribed = true
  
  
   axios.get('http://localhost/REACTJS/cognate1%20api/ProductdataAPI.php')
   .then(res=>{
     
    if (isApiSubscribed)
    {
      setDataproduct(res.data)
      if (not_edit === true)
      {

        console.log(dataT.Customer_date)
        setValue(dataT.Customer_date)
        setModeP(dataT.Customer_modepayment)
        setData(dataT)
        setTest(breaking(dataT))
        setNot_edit(false)

      }


     
    }
   
     
    })
  
   return () => {
    // cancel the subscription
    isApiSubscribed = false
  };
  
  })

  // Data purchase
  const [test,setTest] = useState([
        {
          "Customer_ID": 0,
          "Customer_purchase": "Select product",
          "Customer_price": "",
          "Customer_Quantity": 0,
          "Customer_total": "",
        }
  ])
  


  const breaking = (e) =>{
    
    const Customer_purchase = e.Customer_purchase.split(',')
    const Customer_Quantity = e.Customer_Quantity.split(',')



    return [...Array(Customer_purchase.length)].map(
      (_ , i) => ({
        Customer_ID: parseInt(i),
        Customer_purchase: Customer_purchase[i],
        Customer_price: parseInt(i),
        Customer_Quantity: Customer_Quantity[i],
        Customer_total: parseInt(i)
      }));



  }




  
  const [openDialog,setOpenDialog] = useState(false)
  
  const [disble,setDisble] = useState(false)
  
    return ( 
    <div>
  
    {/* Message Dialog */}
    
  <Dialog
    open={openDialog}
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
  
          <Typography variant='body1'>
           Please review of the following before save edited data
          </Typography>
  
      {/* Confirm Textbox */}
  
  
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
             {moment(date_ito,"mm-dd-yyyy").format().split('T')[0]}
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
                  {ModeP}
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
                    {test.map(e=>
                    <ListItemText key={e.Customer_ID}>
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
                  {test.map(e=>
                  <ListItemText key={e.Customer_ID}>
                      {e.Customer_Quantity}
                  </ListItemText>)} 
                  </Grid>
                </Grid>
              </Grid>

          <Alert severity="warning">
            Please check your email account if the email was sent
          </Alert>

        </DialogContent>
  
        <DialogActions>


                {/* Send email  */}
      <Button 
        onClick={verify_email} 
        disabled={!email}
          autoFocus
          helperText=""
           >Send email</Button>


            <Button 
            onClick={edit_customerdata} 
            variant='contained'
         disabled ={email} >Okay</Button>
  
            <Button 
           onClick={()=>{
            setOpenDialog(false)
            setEmail(true)
           }}
               >
                      Cancel
                  </Button>
        </DialogActions>
  
      </Dialog>
   
  {/* // Whole Container */}
           {/* Alert Success */}
           <Collapse in={show_success}>
           <Alert severity="success"
           onClose={()=>{
             
             setShow_success(false)
             NavS("/Mainpage/Invoice") 
             setData({
  
              Customer_name: "",
              Customer_email: "",
              Customer_cell: "",
              Customer_address: "",
              Customer_purchase: [""],
              Customer_date: new Date(),
              Customer_total: 0,
              Customer_payment:  "Paid"
  
  
             })
             setSelectname([])
             setDisble(false)
           }}
           >
             Data has been updated
           </Alert>
         </Collapse>
  
  {/* Alert Error */}
  <Collapse fullWidth in={show_err ? false : true}>
           <Alert severity="error"
           onClose={()=>{
             
             setShow_err(true) 
             setShow_error(true)
             setDisble(false)
           }}
           >
             ATTENTION! textfield should not be empty!
           </Alert>
         </Collapse>
  
      <Grid container padding={6} paddingTop={2} >
      
  
  
      
  
  {/* Container para sa button paar may padding */}
        <Grid container padding={2}>
  
                 
          {/* Button cancel */}
          <Fab 
          color="primary"  
          aria-label="add" 
          onClick={e=>NavS("/Mainpage/Invoice")} 
          >
            <ClearIcon />
           
          </Fab>
          <Typography variant='h3'  marginLeft={2}> Edit data</Typography>

        </Grid>
  
  {/* Container for all components */}
        <Grid 
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start" 
        style={{
          backgroundColor:"white",
          border:"2px solid black",
          borderRadius: 5
        }}
        onClick={e=>
          {
            setData({...data,Customer_purchase: selectname.toString()})
          }
        }
       >
  
  {/* Name textfield */}
          <Grid item md={10} padding={2}>
              <CcTextField label='Name' type='text' fullWidth
              value={data.Customer_name}
              onChange={e=>{
                setData({...data, Customer_name: e.target.value})
              }}
              error={show_error? false : true}
              helperText={Msg ? Msg : null}
              onClick={()=>
                {
                  setShow_error(true)
                  setMsg(null)
                }
                
              }
              />
          </Grid>
  
  {/* Email textfield */}
          <Grid item md={10} padding={2}>
              <CcTextField label='Email Address' type='Email' fullWidth
              value={data.Customer_email}
              onChange={e=>{
                setData({...data, Customer_email: e.target.value})
              }}
              error={show_error? false : true}
              onClick={()=>setShow_error(true)}
              />
          </Grid>   
  
  {/* Contact textfield */}
          <Grid item md={10} padding={2}>
              <CcTextField label='Contact Number' type='text' fullWidth
              value={data.Customer_cell}
              onChange={e=>{
                setData({...data, Customer_cell: e.target.value})
              }}
              error={show_error? false : true}
              onClick={()=>setShow_error(true)}
              />
          </Grid>
  
  {/* Address textfield */}
          <Grid item md={12} padding={2}>
              <CcTextField multiline label='Address' type='text' fullWidth
              value={data.Customer_address}
              onChange={e=>{
                setData({...data, Customer_address: e.target.value})
              }}
              error={show_error? false : true}
              onClick={()=>setShow_error(true)}
              />
          </Grid> 
  
          <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
  
          
    {/* Date textfield */}
          <Grid item md={2} padding={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                  error={show_error? false : true}
                  inputFormat="yyyy/MM/dd"
                  value={value}
                  onChange={(newValue) => setValue(newValue) }
                  renderInput={(params) => <CcTextField  {...params} 
                  onClick={()=>{
                    setShow_error(true)
                  }}
                  />}
            
                  />
  
                  </LocalizationProvider>
  
          
          </Grid> 
  
  
    {/* Mode of payment */}
          <Grid item md={3} padding={2}>
          
          <Select
            error={show_error? false : true}
            onClick={()=>{
              setShow_error(true)
            }}
            size='small'
            fullWidth
            value={ModeP}
           
            onChange={e=>setModeP(e.target.value)}
  
            renderValue ={() => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip label={ModeP} color='primary'/>
              </Box>
              )}
          >
            <MenuItem value="COD">
              <ListItemText>
                COD
              </ListItemText>
            </MenuItem>
            <MenuItem value="PAYMAYA">
              <ListItemText>
              PAYMAYA
              </ListItemText>
            </MenuItem>
            <MenuItem value="GCASH">            
              <ListItemText>
              GCASH
              </ListItemText>
            </MenuItem>
          </Select>
  
          </Grid>
  
  
    {/* Radio Button for payment status */}
          <Grid item md={3} padding={2}>
          
              <RadioGroup
                row
                value={data.Customer_payment}
                onChange={e => {
                setData({...data,Customer_payment: e.target.value })
                }}
              >
                <FormControlLabel  value="Paid" control={<Radio />} label="Paid" />
                <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
              </RadioGroup>
  
          </Grid>
  
          </Grid>
  
  
  
  {/* Customer item purchase detail */}
          <Grid item md={12} padding={4}>
  
  
  
            <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center" 
            style={{
              border: "2px solid #9B3C21",
              borderRadius:'10px'
            }} 
            paddingBottom={2}
            spacing={2}>
  
  
  
  {/* Add purchase row */}
              <Grid item md={12}>
               
                <Fab 
                  color='primary'
                  aria-label="add" 
                  variant='extended'
                  size='large'
                  onClick={e=>{
                    e.preventDefault()
  
                
                    test.length ?
                    setTest([
                      ...test, {
                        "Customer_ID": parseInt(test[test.length - 1].Customer_ID) + 1,
                        "Customer_purchase": "Select product",
                        "Customer_Quantity": 0,
                        "Customer_total": 0,  
                      }
                    ]) : 
                    setTest([
                      ...test, {
                        "Customer_ID": 0,
                        "Customer_purchase": "Select product",
                        "Customer_Quantity": 0,
                        "Customer_total": 0,  
                      }
                    ])
                   
                  }} 
                  
                  >
                  <AddShoppingCartOutlinedIcon fontSize='medium'/>      
                   <span>Add purchase details</span>
                </Fab>
              </Grid>
  
  
          {/* List pf product purchase detail */}
              {test.map((index)=>(
  
                <Grid  key={index.Customer_ID} padding={2} spacing={2} 
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
  
  {/* Customer purchase */ }
                  <Grid item md={4}>

                  <Typography variant='subtitle1'>
                  {"This product is " + dataproduct
                  ?.filter(e=>e.Product_name === index.Customer_purchase)
                  ?.map(e=>e.Product_Status)
                  }
                  </Typography>    

                    <Select
                      value={index.Customer_purchase}
                      fullWidth
                      onClick={e=>{
                        e.preventDefault()
                      }}
                      onChange={e=>{
                        const list = [...test]
                        list[index.Customer_ID]["Customer_purchase"] = e.target.value
                        list[index.Customer_ID]["Customer_Quantity"] = 1
                        console.log(list)
                      setTest(list)
                      }}
                      renderValue ={() => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          <Chip label={index.Customer_purchase} color='primary'/>
                        </Box>
                        )}                      
                      >
                        <MenuItem value="Select product"></MenuItem>
                      {dataproduct.map((name) => (
                        <MenuItem key={name.Product_ID} value={name.Product_name}>
                          <ListItemText primary={name.Product_name} />
                        </MenuItem>
                      ))}
                    </Select>                     
                  </Grid>
  
  {/* Quantity */}
                  <Grid item md={2}>
               
                    <CcTextField label="Quantity" fullWidth
                      value={index.Customer_Quantity}
                      onChange={
                        e=>{
                          const list = [...test]
                          list[index.Customer_ID]["Customer_Quantity"] = e.target.value
                          setTest(list)
                        }
                      }
                  />

                <Typography variant='subtitle2'>
                  {"Available stocks is " + dataproduct
                  ?.filter(e=>e.Product_name === index.Customer_purchase)
                  ?.map(e=>e.Product_stocks)
                  }
                </Typography> 

                  </Grid>
  
  {/*  Price */}
                  <Grid item md={2}>
                  
                    <CcTextField label="Price" fullWidth
                    value={
                      dataproduct.filter(e=> e.Product_name === index.Customer_purchase)
                      .map(e=>e.Product_price)
                      .toLocaleString(undefined, { maximumFractionDigits: 2})
                      
                    }
  
                  />
                  </Grid>   
  
  
  {/* Total price */}
                  <Grid item md={2}>
               
                    <CcTextField label="Total price" fullWidth
                    value={
                      // Multiplication
                      index.Customer_total = 
                      index.Customer_Quantity 
                      * 
                      dataproduct.filter(e => 
                        e.Product_name 
                        === index.Customer_purchase)
                      .map(e=>e.Product_price)
                  }
                  />
                  </Grid>
  
  
  {/* Button remove */} 
                  <Grid item md={2} >
                    <Fab 
                    
                    value={ index.Customer_ID}
                    color="primary"  
                    aria-label="add" 
                    onClick={e=> 
                      {
                        
                        // setIsApiSubscribed(false)
                        const list = [...test]
                          const index = list.map(e=>e.Customer_ID).indexOf(parseInt(e.currentTarget.value))
                          list.splice(index,1)
  
                          // console.log(list)
                           setTest(list)
                        
  
                        
                      }
                  
                    }
                    size='small'
                    >
                      <ClearIcon />
           
                    </Fab>
              </Grid>                
  
                </Grid>
              )
              )}
  
  
            <Grid padding={2}>
              <Typography variant='h6'>
                Total payment: 
              </Typography>
                
              <CcTextField value={
                test.reduce((a,b)=> a = a + b.Customer_total,0)
                .toLocaleString(undefined, {maximumFractionDigits: 2})
                }/>
  
              
  
            </Grid>
  
  {/* Button Conatainer  */} 
            <Grid container padding={2} spacing={1} >
  
  {/* Button create  */} 
              <Grid item md={3} >
                <Fab   
                             
                  color="primary"  
                  aria-label="add" 
                  variant='extended'
                  onClick={e=>setOpenDialog(true)}
                  >
                    <SaveAltOutlinedIcon fontSize='medium' />
                    <Typography marginLeft={1} variant='p'>Save Edit data</Typography>
           
                </Fab>
              </Grid> 
  
  {/* Button save as draft */} 
              <Grid item md={3} >
                <Fab        
             
                  color="primary"  
                  aria-label="add" 
                  variant='extended'
                  onClick={Move_customerdata}
                  >
                    <DraftsOutlinedIcon fontSize='medium' />
                    <Typography marginLeft={1} variant='p'>Save to draft</Typography>
           
                </Fab>
              </Grid>    
  
            </Grid>           
              
            </Grid>
  
      
         
          </Grid>
  
  
  
        </Grid>
  
      </Grid>
      </div>
  )
  }
  
  export default Edit_data