const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors')
const Verifier = require("email-verifier");
const crypto = require('crypto')

require('dotenv').config();

const app = express();

app.use(cors())
// Body parser middleware
app.use(express.json())
app.use(express.urlencoded( {extended:false} ) ) //Middleware
const port = process.env.PORT || 3001

// verify email code

let verifier = new Verifier("your_whoisapi_username", "your_whoisapi_password");

const verify = (email) =>{
    verifier.verify(email, (err, data) => {
        if (err) return  true;
        return  false;
      });
}


// Confirmation email query

app.post('/sendingEmail', (req , res) => {


if (verify(req.body.Email)) res.json({
    "Message" : "Email does not exist",
    "Result" : false
});

    let mailOption = {
        from: process.env.ADMIN_EMAIL,
        to: req.body.Email,
        subject: "Confirmation Order: " + req.body.Date + "| Payment status: " + req.body.Status,
        text: "Hello! " + req.body.Name 
        + " this is your order ' " + req.body.Message + " '" 
        + "\nTotal price you is " + req.body.Total
        + "\nand your mode of payment is " + req.body.Mode
        + "\nPlease do screenshot of this and send back to us" 
        + "\nThank you!"

    }


    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {

        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
        },
        tls: {
        rejectUnauthorized: false
        }
})

 
    transporter.sendMail(mailOption, (err,success) => {
        if (err)
        {
            res.json({
                "Message" : "Invalid email",
                "Result" : false
            })
        }else{
            res.json({
                "Message" : "Successful send",
                "Result" : true
            })
  
        }
})



});


// Update email query
app.post('/updatedEmail', (req , res) => {


    if (verify(req.body.Email)) res.json({
        "Message" : "Email does not exist",
        "Result" : false
    });
    
        let mailOption = {
            from: process.env.ADMIN_EMAIL,
            to: req.body.Email,
            subject: "Update Order: " + req.body.Date + "| Payment status: " + req.body.Status,
            text: "Hello! " + req.body.Name 
            + "\nWe updated your details in our database."
            + "\nthis is your order ' " + req.body.Message + " '" 
            + "\nTotal price is " + req.body.Total
            + "\nand your mode of payment is " + req.body.Mode
            + "\nIf you have any problem regarding to this please do screenshot of this and send back to us on messenger" 
            + "\nelse ignore this"
            + "\nThank you!"
    
        }
    
    
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
    
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
            },
            tls: {
            rejectUnauthorized: false
            }
    })
    
     
        transporter.sendMail(mailOption, (err,success) => {
            if (err)
            {
                res.json({
                    "Message" : "Invalid email",
                    "Result" : false
                })
            }else{
                res.json({
                    "Message" : "Successful send",
                    "Result" : true
                })
      
            }
    })
    
    
    
    });

// send authentication code query
     app.get('/Authentication', (req,res) =>{
        

         let code = crypto.randomInt(0, 1000000)

         let mailOption = {
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "High Resolution Verification Admin code",
            text: "Hello! this is your Verication Email Code" 
            + "\n\n" + code 
            + "\n\nPlease do not share this!"
    
        }
    
    
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
    
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
            },
            tls: {
            rejectUnauthorized: false
            }
    })
    
     
        transporter.sendMail(mailOption, (err,success) => {
            if (err)
            {
                res.json({
                    "Message" : "Invalid email",
                    "Result" : false,
                    "code" : 000000
                })
            }else{
                res.json({
                    "Message" : "Successful send",
                    "Result" : true,
                    "code": code
                })
      
            }
    })





     })




app.listen(port, ()=>{
    console.log("this is running btch");
})