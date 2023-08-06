import React, { useEffect, useState,useContext } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { UserContext } from './App';
import {  useNavigate } from 'react-router-dom';

const Verification_code = () => {

const [disable,setDisbale] =  useState(false)
const [text,setText] = useState("")
const [number, setNumber] = useState(0)
useEffect(
  () => 
  { 
   const interval = setInterval(()=>{

    if (number !== 0) 
    {
      setNumber(number - 1)
    }else{
      setDisbale(false)
    }
    },1000)


    return () => 
    {
      clearInterval(interval)
    }

  }

  )
  const [a,setA] = useState("")
  // Update code
  const update_code = (data) =>{

    axios.post('http://localhost/REACTJS/cognate1%20api/update_code.php', { "code" : data})
    .then(res=>
      {
        console.log(res.data) 
      }
    )

  }

  // Send verication code
  const sending_code = e => {
    e.preventDefault()
        axios.get('http://localhost:3001/Authentication')
        .then(res=>update_code(res.data.code))

    setNumber(90)
    setDisbale(true)
    setText("Please submit the verification code again because it has expired.")
    setInput_code("")
  }


// Verify input code
let NavS = useNavigate();
const [err,setErr] = useState(false)
const [input_code,setInput_code] = useState("")
const {setUser } = useContext(UserContext);
  const verifiy_inputcode = e => {
    e.preventDefault()

    axios.post('http://localhost/REACTJS/cognate1%20api/code.php', { "code" : input_code})
    .then(res=>
      {
        setErr(!res.data[0].Result)
        setUser({loggedIn: res.data[0].Result})
        if (res.data[0].Result) {NavS("/Mainpage")}
      }
    )
  }
  return (
    <div>
      
      <Dialog open={true} >
        <DialogTitle>High Resolution</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To submit verification to your account, please click the send button and enter the verification code in the textbox.
          </DialogContentText>

          {/* Input code fiels */}
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Authentrication Code"
            type="number"
            fullWidth
            variant="standard"
            value = {input_code}
            onChange={e=>setInput_code(e.target.value)}
            error = {err}
            helperText = {err? "Invalid Text" : ""}
          />

          <DialogContentText paddingY={1}>
            {disable === true && "verification code expired in " + number + "."}
            {disable === false && text}
          </DialogContentText>

             {/*send code  */}
          <Button 
          disabled={disable} 
          variant='outlined' 
          onClick={sending_code}>send code</Button> 
      
        </DialogContent>
        <DialogActions>

          {/* Submit verification code */}
          <Button disabled={!disable}  onClick={verifiy_inputcode}>Submit</Button>

          {/* Cancel verification code */}
          <Button  onClick={e=>
          {
            e.preventDefault()
            setText("") 
            NavS("/")
          }
            }>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Verification_code