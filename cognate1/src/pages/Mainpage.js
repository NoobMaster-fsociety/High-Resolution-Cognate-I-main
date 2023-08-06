  import {  
    Typography, 
    IconButton, 
    Toolbar, 
    Drawer, 
    Grid,
    Box,
    ButtonGroup,
    Button,
    Alert,
    Collapse,
    AlertTitle,

  } from '@mui/material';

  import React, { useContext, useEffect, useState } from 'react'
  import { 
    styled, 
  } from '@mui/material/styles';

  import {  useNavigate } from 'react-router-dom';

  import MuiAppBar from '@mui/material/AppBar';

  ///ICONS

  import LOGO  from './icons/user.png'

  import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
  import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
  import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
  import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
  import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
  import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

  import { UserContext } from '../App';
import axios from 'axios';
  


  const drawerWidth = 240;
     // Custom Header
 const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
 


  const Mainpage = () => {

    // const [drawerWidth,setdrawerWidth] = useState(240)

    useEffect(() => {


      axios.get('http://localhost/REACTJS/cognate1%20api/ProductdataAPI.php')
      .then(res=>{
        [...res.data]?.filter(e=>e.Product_stocks <= 0).length === 0 ?
        setAlert_stocks(false) : setAlert_stocks(true)          
      }
        

        
    )
    // !stocsk ? setAlert_stocks(true) : setAlert_stocks(false)
     
      });

    // NAVIGATION TO ANOTHER PAGE
    let nv = useNavigate()


    //Hook for sidebar true or false
    const [open ,setOpen] = useState(false)
// alert
    const [alert_stocks,setAlert_stocks] =useState(false)
    const [stocsk,setStocsk] = useState()
  
  // CUSTOM BUTTON
  const buttons = [

    // Button Dashboard
    <IconButton  color="secondary" onClick={(e)=>{e.preventDefault(); nv("Mainpage") }}>
      {/* Icon */}
      <AnalyticsOutlinedIcon  fontSize='large'/> 
      {/* Text */}
      <Typography  variant='h6'marginX={3} >Dashboard</Typography>
    </IconButton>,

    // Button Stocks
    <IconButton  color="secondary" onClick={(e)=>{e.preventDefault(); nv("Mainpage/Stocks")}}>
      <AddShoppingCartOutlinedIcon  margin='dense' fontSize='large'/>
      <Typography variant='h6' marginX={5.5} >Stocks</Typography>
    </IconButton>,


      // Button Products
    <IconButton  color="secondary" onClick={(e)=>{e.preventDefault(); nv("Mainpage/Products")}}>
      <BusinessCenterOutlinedIcon  margin='dense' fontSize='large'/>
      <Typography variant='h6'marginX={4.2} >Products</Typography>
    </IconButton>,

    //   // Button Sales Report
    // <IconButton fullwidth color="secondary" onClick={(e)=>{e.preventDefault(); nv("/Mainpage/Salesreport")}}>
    //   <AutoGraphOutlinedIcon  margin='dense' fontSize='large'/>
    //   <Typography noWrap variant='h6' marginX={2}  >Sales Report</Typography>
    // </IconButton>,

      // Button Invoice
    <IconButton  color="secondary" onClick={(e)=>{e.preventDefault(); nv("Mainpage/Invoice") }}>
      <FeedOutlinedIcon  margin='dense' fontSize='large'/>
      <Typography variant='h6'marginX={5.5} >Invoice</Typography>
    </IconButton>,

  ];


  const { setUser } = useContext(UserContext);

    return (
      <div>

  <AppBar position='fixed' open={open} 
    onClick={() => {
      if(open){
        setOpen(false)
      }
    }}>
      

       <Toolbar variant='dense'>


   

        <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}>
  {/* ICON */}
              <MenuRoundedIcon fontSize='large' />
            </IconButton>


           
            <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >

            
            

{/* Logout */}
            <IconButton size='large' edge ='end' color="inherit" onClick={setUser}>
              <LogoutOutlinedIcon fontSize='large' />
            </IconButton>

            </Grid>
    

  {/* SIDE BAR */}
        <Drawer
  // permanent
        variant="persistent"
        anchor="left"
        open={open}


        sx={{
          
          width: 0,
          flexShrink: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}>

          
          <Grid           
            item 
    
            container 
            direction="column"
            justifyContent="center"
            alignItems="center">

              {/* Picturebox */}
              <Box
              fixed
              component='img'
              marginY={2}

              sx={{
                width: 100,
                height: 100,
              }}
              src={LOGO} />
              

  {/* LABEL */}
              <Typography variant='subtitle1'> Frances Bryan Maneclang</Typography>
              <Typography variant='subtitle2'> CEO</Typography>

  {/* Edit Profile  */}
              <br/>
              <Button variant='outlined' color='secondary' 
              onClick={
                (e)=>{
                  e.preventDefault()
                  // setUser({ loggedIn: false });
                  nv("/Mainpage/EditProfile")
            

                }
              }> Account Settings </Button>
              <br/>

          </Grid>



                  <ButtonGroup
                  fullWidth
                  orientation="vertical"
                  aria-label="vertical contained button group"
                  variant="outlined">


                  {buttons}

                </ButtonGroup>
        

        
    
        </Drawer>

   
            </Toolbar>
    </AppBar>


    <br/>
    <br/>
    <br/>
    <br/>
    <Collapse in={alert_stocks}>
      <Alert severity="error">
        <AlertTitle>Warning</AlertTitle>
        Some of your product items were <strong>out of stock!</strong>
      </Alert>
    </Collapse>
      

      </div>
    )
  }

  export default Mainpage