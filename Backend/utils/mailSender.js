const nodemailer = require('nodemailer')
require('dotenv').config()
const sendMail=async (mail,title,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
             port: Number(process.env.MAIL_PORT),
    secure: false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        })

     const info =   await transporter.sendMail({
            to:mail,
            from:"Coding World",
            subject:`${title}`,
            html:`${body}`
            
        })
        console.log('mail send successfully')
        console.log(info)
        return info;
    }
    catch(err){
        console.log("error aa gyi mail bhejna me",err)
    }
}
module.exports = sendMail;
