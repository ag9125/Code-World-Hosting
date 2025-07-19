const mongoose = require('mongoose');
const sendMail = require('../utils/mailSender')
const otpsendMail = require('../mail/templates/emailVerificationTemplate')
const otpSchema = new mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        otp:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default :Date.now(),
            expires:5*60*60
        }
})
async function sendVerificationEmail(email,otp){
    try{
      const res= await sendMail(email,"Verification",otpsendMail(otp))
      console.log(res)

    }
    catch(err){
        console.log("error occured while sending mail :",err)
        throw err;
    }
}
otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model('Otp',otpSchema)