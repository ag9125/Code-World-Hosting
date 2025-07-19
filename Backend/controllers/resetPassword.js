const User = require("../models/User")
const sendMail = require('../utils/mailSender')
const bcrypt =require('bcrypt')
//resetPassword Token 
exports.resetPasswordToken = async (req,res)=>{
    try{
        //get email from req to send email reset token
        const email = req.body.email;
        //check user exists
        const isUser = await User.findOne({email})
        if(!isUser) return res.json({
            success:false,
            message:'User not Exists '
        })

        //genearte  always a unique token
        const token =  crypto.randomUUID()

        //add token and expiry time in user Schema
        const updatedUser = await User.findOneAndUpdate({email},{resetToken:token,resetPasswordExpiry:Date.now() + 5*60*1000},{new:true})
        //genrate url
        const url = `http://localhost:3000/update-password/${token}`

        //mail send
        const mailSend = await sendMail(email,"Reset Password",url)
       return  res.status(200).json({
            success:true,
            message:"Reset Password mail Send Successfully"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'reset Password failed'
        })
    }
}

exports. resetPassword = async (req,res)=>{
    try{
            const {token,password,confirmPassword} = req.body;
            if(password!==confirmPassword){
                return res.json({
                    message:"Both Passwords are not same"
                })
            }
            const user =await User.findOne({resetToken:token})

            if(!user){
              return  res.status(400).json({
                    success:false,
                    message:"Invalid Token"
                })
            }
             if(user.resetPasswordExpiry<Date.now()){
                return res.status(400).json({
                    success:false,
                    message:"Token Expired"
                })
            }
            const hashPass = await bcrypt.hash(password,10)
            const updatedUser = await User.findOneAndUpdate({token},{password:hashPass},{new:true})
            return res.status(200).json({
                success:true,
                message:"Password Updated Successfully"
            })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Password reset failed"
        })
    }
}