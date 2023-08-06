import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React, { useState } from 'react'

const Message_dialog = () => {
    const [open, setOpen] = useState(true)
  return (
    <div>
        <Button variant='outlined' onClick={()=>setOpen(true)}>
            open me 
        </Button>

        <Dialog
            open={open}
            onClose={()=> setOpen(false)}>
                (false)
            <DialogTitle>
                <Typography variant='h5'>
                    High Resolution
                </Typography>
            </DialogTitle> 

            <DialogContent>
                <Typography variant='body1'>

               
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.

            </Typography>
                
            </DialogContent>

            <DialogActions>
                <Button variant='contained' onClick={()=> setOpen(false)}>Okay</Button>
                <Button onClick={()=> setOpen(false)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
  

    </div>
  )
}

export default Message_dialog