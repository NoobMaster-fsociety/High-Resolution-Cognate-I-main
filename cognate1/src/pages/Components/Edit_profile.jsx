import { 
  Grid, 
  Box,
  Paper, 
  Typography, 
  Stack, 
  TextField, 
  Button,
  IconButton, 
  Divider, 
  Collapse, 
  Alert, 
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions} from '@mui/material'

import { styled } from "@mui/material/styles";

import React, { useEffect, useRef, useState } from 'react'

//ICONS
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

import LOGO  from '../icons/user.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Custom TextField

export const CTextField = styled(TextField)({
    '& .MuiInputBase-input': {
  
      position: 'relative',
      fontSize: 20,
      padding: '12px',
  
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

const Edit_profile = () => {

///show pass
const [show,setShow] = useState(true)

//Login_Data storage
  const [edit_data, setEdit_data] = useState([])

  //Query Json
  const [data,setData] = useState({
    "email" : "",
    "password": "",
    "sec1" : "",
    "sec2" : ""
  })

//enable hooks
  const [enble, setEnble] = useState(true)

//For alert success
  const [show_alert,setShow_alert] = useState()
//For alert error
  const [show_error,setShow_error] = useState()
// edit sjow
const [sec,setSec] = useState(false)


const update = (e) =>{
  e.preventDefault()

  axios.post('http://localhost/REACTJS/cognate1%20api/Update_LoginAPI.php' , data)
  .then(res=> {
    setShow_alert(res.data[0].Result)
    console.log(res.data)
    console.log(data)
    res.data[0].Result ? setShow_error(false) : setShow_error(true)
 
  }
    )
}

const defaultvalue = () => {
  setData(
    {
    email: String(edit_data.map(e=>e.email)),
    password: String(edit_data.map(e=>e.password)),
    sec1: String(edit_data.map(e=>e.sec1)),
    sec2: String(edit_data.map(e=>e.sec2))
  }
  )

}

// NAVIGATION TO ANOTHER PAGE
    let nv = useNavigate()


    // HTTP REQUEST
    useEffect(() => {
        
     let api_calls = true
      axios.get('http://localhost/REACTJS/cognate1%20api/View_LoginAPI.php')
      .then(res=> 
        {
          if (api_calls)
          {
            setEdit_data(res.data)
          }
          
        }
        )
        .catch(err=>console.log(err))
        
    return () => api_calls = false
      
    });


  return (
    <div>


      <Dialog
        open={sec}
        // onClose={close}
        // PaperComponent={PaperComponent}
        // aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">

          Setup security question
 
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
{/* Question #1 */}
<Typography>
Unforgettable experience that you have already forgotten?
</Typography>

<CTextField 
  fullWidth 
  type='email'  
  variant="outlined" 
  margin="normal" 
  value={String(data.sec1)}
  onChange={e=>{
    setData({...data, sec1: e.target.value})
  }}
  disable={true}
/> 

{/* Question #2 */}
<Typography>
Something you neglected?
</Typography>

<CTextField 
  fullWidth 
  type='email'  
  variant="outlined" 
  margin="normal"
 
  value={String(data.sec2)}

  onChange={e=>{
    setData({...data, sec2: e.target.value})
  }}
  disable={true}

/> 

{/* Save edit */}
<Fab  variant='extended' color='primary' onClick={update} >
  save edit
</Fab>  
          </DialogContentText>

        </DialogContent>

        <DialogActions>

{/* cancel edit */}
          <Button autoFocus onClick={e=> {
            e.preventDefault()
            setSec(false)
             }} >
            Cancel
          </Button>

        </DialogActions>
      </Dialog>

      {/* Alert if success */}
      <Collapse in={show_alert}>
        <Alert severity="success"
           onClose={()=>
            {
              setShow_alert(false)
              setEnble(true)
            }

           
           }>
           Data has been updated
        </Alert>
      </Collapse>

      {/* Alert if not*/}
      <Collapse in={show_error}>
        <Alert severity="error"
           onClose={()=>
            {
              setShow_error(false)

            }

           
           }>
           Unable to update
        </Alert>

      </Collapse>
      

        <Grid
        container
        direction="column "
        justifyContent="center"
        alignItems="center">

        <Box padding={2} paddingTop={10}>

            <Grid 
            component={Paper} 
            variant='outlined' 
            padding={3}
            style={{
                backgroundColor:'white',
                border:'2px solid black'
            }}>
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>

                  {/* Logo */}
                    <Box 
                    fixed
                    component='img'
                    style={{
                        width:120,
                        height:120,
                    }}
                    src={LOGO}/>

                    {/* Label Name */}
                    <Typography  variant='h4'>Francis Maneclang</Typography>
                    <Typography  variant='h6'>CEO</Typography>

{/* Edit and cancel edit button */}
                    <Grid container justifyContent="flex-end">

                    {/* SetUp security question */}
                      <IconButton color='primary'
                      onClick={e=>{
                        setSec(true)
  
                        defaultvalue()
                       
                      }}>
                        <SettingsIcon fontSize='large'/>
                
                      </IconButton>

                      <IconButton color='primary' onClick={e=>{
                        e.preventDefault(); 
                        defaultvalue()
                        enble ?
                        setEnble(false): setEnble(true)}}>
                          
                          {
                            enble ? <BorderColorOutlinedIcon fontSize='large' /> : <CloseIcon fontSize='large' />
                          }
                          
                        
                      </IconButton>

                    </Grid>

                <Collapse in={enble}>
                  

{/* email edit */}
         
                  <CTextField 
                    fullWidth 
                    type='email'  
                    variant="outlined" 
                    margin="normal"
                   
                    value={String(edit_data.map(e=>e.email))}
                    disable={true}

                  />       


{/* password edit */}
                  <CTextField 
                    fullWidth 
                    type='password'
                    variant="outlined" 
                    margin="normal"
                    value={String(edit_data.map(e=>e.password))}
                    disable={true}

                   
                    />
                </Collapse> 


{/* FOR UPDATE QUERY */}
                    {enble === true && <Divider>Click edit button to edit</Divider> }              
                  
                <Collapse in={enble ? false : true}>

{/* Email */}
                     <CTextField 
                      fullWidth 
                      type='email'
                      placeholder='Enter your new password'
                      variant="outlined" 
                      margin="normal"
                      
                      value ={data.email}
                     
                      onChange={e=>{
                      setData({...data, email: e.target.value})
                      }}

                      onClick={()=>{
                        if (data.password === "")
                        {
                          setData({...data, password: String(edit_data.map(e=>e.password))})
                        }
                        

                      }}
                    
                      />
{/* Password */}
                      <CTextField 
                      fullWidth 
                      type='password'
                      placeholder='Enter your new password'
                      variant="outlined" 
                      margin="normal"
                      value ={data.password}
                      onChange={e=>{
                        setData({...data, password: e.target.value})
                      }}
                      onClick={()=>{
                        if (data.password === String(edit_data.map(e=>e.password)))
                        {
                          setData({...data, password: ""})
                        }
                        

                      }}
                
                        
                      />


                </Collapse>
                     
                   
                    <Button
                    variant='contained'

                    disabled={enble}  

                    style={{
                    borderRadius: '20px',
                    width:150,
                    padding:10,
                    }}
                    onClick={update}
                    
                    
                    > Save </Button>

                    <Button 
                    variant='contained' 
                    style={{
                    borderRadius: '20px',
                    width:150,
                    padding:10}}
                    
                    onClick={e=> nv("/Mainpage")}
                    
                    > cancel </Button>

                    

      


                </Stack>
              




              


            




            </Grid>
       
                

            


         
    
        </Box>
         
        </Grid>
    </div>
  )
}

export default Edit_profile