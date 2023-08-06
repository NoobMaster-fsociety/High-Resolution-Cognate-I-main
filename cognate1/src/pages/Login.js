import {  AppBar, Button, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useContext,  useState } from 'react'
import Logo from './Logo.ico'
import {  useNavigate } from 'react-router-dom';
import LOGO  from './LOGO.png'
import { UserContext } from '../App';
import axios from 'axios';


// Cutom Button
const CButton = styled(Button)({
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 18,
  padding: "6px 12px",
  border: "2px solid",
  lineHeight: 1.5,
  backgroundColor: "#9B3C21",
  borderColor: "white",

  "&:hover": {
    backgroundColor: "white",
    borderColor: "#9B3C21",
    color: "#9B3C21",
    boxShadow: "none"
  }
});

const Capp = styled(AppBar)({
  backgroundColor: "#9B3C21",

})

// Custom Textbox
const CTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#9B3C21',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9B3C21',
    color: '#9B3C21',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'Black',
      color:'black',
      border:'2px solid black'
    },

    '&.Mui-focused fieldset': {
      borderColor: '#9B3C21',
      color: '#9B3C21',
    },
  },
});


const Login = () => {

const {setUser} = useContext(UserContext);

const  [input, setInput]= useState({
  email: '',
  password:'',
  sec1: null,
  sec2: null,

})

let NavS = useNavigate();

// error
const [shower,setShower] = useState(true)

const log =(e) => {
  e.preventDefault(); 

  // HTTP REQUEST


  //http://localhost/REACTJS/cognate1%20api/LoginAPI.php
  //http://highresolutionapi.epizy.com/REACTjs/cognate1%20api/LoginAPI.php
  axios.post('http://localhost/REACTJS/cognate1%20api/LoginAPI.php', input)
  .then(
    res=>{
      console.log(input)
      setShower(res.data[0].Result)
      setUser({loggedIn: res.data[0].Result})
      if (res.data[0].Result) {NavS("/Mainpage")}
    } 
  )


}



  return (
    <div >
     
      
<form noValidate>
   
{/* Container Whole */}
      <Grid
      container
      backgroundColor
      spacing={0}
      direction="row"
      justifyContent="center"
      alignItems="stretch"

      style={
        {
          minHeight:'100vh',
          // backgroundImage: `url(${back1})`,
          // backgroundRepeat:'no-repeat',
          

        }}>

{/* Container Logo */}
          <Grid
          item 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12} md={6}>


{/* Picture box */}       
            <Box
            fixed
            component='img'
            sx={{
              width: '90%',
              height: 'auto',
              maxHeight: { xs: 'auto', md: 'auto' },
              maxWidth: { xs: 300, md: '90%' },
            }}
            src={LOGO} />
              
            </Grid>


{/* Container Login */}
            <Grid
            item 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12} md={6}>


{/* Container Box */}
              <Box
              sx={{
                width:400,
                height:500,
                backgroundColor: '#ffffff',
                maxHeight: { xs: '500', md: '300' },
                maxWidth: { xs: '350', md: '600' },
                border:"3px solid black",
                borderRadius:2
              }}>

{/* Header */}
               <Capp position='relative'>
                 
                 <Typography variant='h5' margin={2}>LOG IN</Typography>

               </Capp>
              

{/* Textfield,Login Hyperlink container */}
            <Grid
            container
            item 
            paddingTop={8}
            paddingX={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
>

{/* Email Textbox */}
              <CTextField 
              type='email' 
              error={shower ? false : true}
              value = {input.email}
              onChange={e => setInput({ ...input, email: e.target.value})}

              onClick={e=>setShower(true)}
              
              label='email' 
              placeholder='input email' 
              fullWidth 

              margin='dense' 
              variant='outlined'
              size='normal'/>

{/* Password Textbox */}
              <CTextField

              value = {input.password}
              onChange={e => setInput({ ...input, password: e.target.value})}
              error={shower ? false : true}
              helperText={shower ? "" : "error occur unable to log in"}
              onClick={e=>setShower(true)}
              label='password' 
              placeholder='input password' 
              type='password' 
              fullWidth 
              margin='dense' 
              variant='outlined'
              size='normal'/>

{/* Hyperlink */}
              <Typography variant='h5' onClick={()=> NavS("Forgotpassword")} margin={2}>
              <a href=''> forgot password</a></Typography>

{/* Log in Button */}
              <CButton onClick={log} variant='contained' fullWidth > Log in</CButton>

              </Grid>




              </Box>

              </Grid>


       </Grid>
       
</form>

    </div>
  )
}


export default Login