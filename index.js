const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

function sendEmail(){
    return new Promise((resolve, reject) => {     
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                // sender mail id and password generated using app password. see readme file to generate password
                user: '',    
                pass:''
            }

        })

    const mail_configs = {
        // sender and reciever mail id
        from:'',
        to:'',
        subject:'Testing Email',
        text:"checking if email will be send"
    }
    transporter.sendMail(mail_configs , function(error, info){
        if(error){
            console.log(error);
            return reject({message:`An error has occured`});
        }
        return resolve({message:`Email sent successfully`});
    })


    })
}

app.get('/',(req,res) => {

    sendEmail()
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message))
})

// listen to port
app.listen(port, ()=>{
    console.log(`nodemailer project listening at http://localhost:${port}`)
});