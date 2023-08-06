import styled from '@emotion/styled'
import { AppBar, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Forgot_password = () => {
    let NavS = useNavigate();
// header for forgot password
    const Capp = styled(AppBar)({
        backgroundColor: "#9B3C21",
      
      })

// security verification value
const [sec,setSec]  = useState(
    {
        email: null,
        password: null,
        sec1: "",
        sec2: ""
    }
)

const [pass,setPass] = useState({
    pass1: '',
    password: ''
})

// ecuirty
const [show,setShow] = useState(false)
// error
const [shower,setShower] = useState(true)
// show result
const [Result,setResult] = useState()

// show result
const [Result1,setResult1] = useState()

// Message
const [message,setMessage] = useState("")

const onSubmit = e =>{

e.preventDefault()
      // HTTP REQUEST
  axios.post('http://localhost/REACTJS/cognate1%20api/LoginAPI.php', sec)
  .then(
    res=>{

        setShower(res.data[0].Result)
        setShow(res.data[0].Result)
        console.log(res.data)

    } 
  )

}

const onSubmit_password = e =>{

    e.preventDefault()
          // HTTP REQUEST
      axios.post('http://localhost/REACTJS/cognate1%20api/Change_passwordAPI.php', pass)
      .then(
        res=>{
            res.data[0].Result ? 
            setResult(false) : setResult(true)
            setResult1(res.data[0].Result)
            setMessage(res.data[0].Message)
            console.log(res.data)
    
        } 
      )
    
    }

  return (
    <div>

{/* pang break */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>



{/* Message is false */}

<Dialog
        open={Result1}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Password has
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={e=>NavS('/')} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

{/* Message is false */}

    <Dialog
        open={Result}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={e=>setResult(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

        {/* Whole container */}
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        >

            {/* Item container */}
            <Grid item md={8} style={{ width: 700}}>
                
                {/* Header */}
                <Capp position='static'>
                    <Typography variant='h5' margin={2}>Forgot password</Typography>
                </Capp>

                {/* Components */}
                <Grid         
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding={2}
  
                style={
                    {
                        backgroundColor: "white",
                        border: "solid 2px black"
                    }
                }>
                    <Collapse in={show ? false : true}>
                    <form>
                    {/* First Question */}
                    <Grid item>
                        <Typography variant='h6'> Unforgettable experience that you have already forgotten?</Typography>
                        <TextField 
                        multiline 
                        fullWidth 
                        placeholder='Answer this please' 
                        margin='normal'
                        helperText='I dont know'
                        value={sec.sec1}
                        error={shower ? false : true}
                        onChange={
                            e=>{
                                setSec({...sec, sec1: e.target.value})
                            }
                        }
                        required/>
                    </Grid>

                    {/* Second Question */}
                    <Grid item >
                        <Typography variant='h6'> Something you neglected?</Typography>
                        <TextField 
                        required
                        multiline 
                        fullWidth 
                        placeholder='Answer this please' 
                        margin='normal'
                        helperText='I dont know'
                        value={sec.sec2}
                        error={shower ? false : true}
                        onChange={
                            e=>setSec({...sec, sec2: e.target.value})
                        }
                        />
                    </Grid>

                                        {/* Second Question */}
                    <Grid item md={3} padding={1} >
                        <Button type='submit' fullWidth variant='contained' onClick={onSubmit}>
                            Submit
                        </Button>

                    </Grid>
                    <Grid item md={3} padding={1} >
                        <Button fullWidth variant='contained' onClick={e=>NavS("/")} >
                            Cancel
                        </Button>
                    </Grid>

                    </form>
                    </Collapse>

{/* Change password */}
                    <Collapse in={show}>
                    <form>
                    {/* First Question */}
                    <Grid item>
                        <Typography variant='h6'> Change password</Typography>
                        <TextField 
                        type='password'
                        fullWidth 
                        placeholder='Type your new password' 
                        margin='normal'
                        value={pass.pass1}
                        error={shower ? false : true}
                        onChange={
                            e=>{
                                setPass({...pass, pass1: e.target.value})
                            }
                        }
                        required/>
                    </Grid>

                    {/* Second Question */}
                    <Grid item >
                        <Typography variant='h6'> Confirm password</Typography>
                        <TextField 
                        required
                        type='password'
                        fullWidth 
                        placeholder='Confirm your new password' 
                        margin='normal'
                        value={pass.password}
                        error={shower ? false : true}
                        onChange={
                            e=>{
                                setPass({...pass, password: e.target.value})
                            }
                        }
                        />
                    </Grid>

                                        {/* Second Question */}
                    <Grid item md={3} padding={1} style={{width:600}} >
                        <Button type='submit' fullWidth variant='contained' onClick={onSubmit_password}>
                            Submit
                        </Button>

                    </Grid>


                    </form>
                    </Collapse>

                </Grid>
                
            </Grid>

        </Grid>
          
    </div>
  )
}

// {/* <Collapse in={true}>




// </Collapse> */}
export default Forgot_password