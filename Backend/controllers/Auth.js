const User  = require('../models/User')
const otp_generator = require('otp-generator')
const Otp = require('../models/Otp')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile')
// const otpsendMail = require('../mail/templates/emailVerificationTemplate')
const sendMail = require('../utils/mailSender')
//sendOtp

exports.sendOtp =async (req,res)=>{
    try{
        const {email} = req.body
        const isemailExists = await User.findOne({email});
        if(isemailExists){
           return res.status(400).json({
                success:false,
                message:'User Already Exists'

            })
        }
        //generate otp
        // var  otp = otp_generator.generate(6, {
        //     upperCaseAlphabets:false,
        //     lowerCaseAlphabets:false,
        //     specialChars:false
        // })

        //ensure uniqenss
        var otp;
        let ifOtpexist =true
        while(ifOtpexist){
            otp = otp_generator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
         ifOtpexist = await Otp.findOne({otp})
        }
        console.log("otp is : ",otp)

        //otp object create
        const newOtp = new Otp({
            email,otp
        })
      const otpbody =  await newOtp.save();
    
      
      console.log('otp body is : ',otpbody)
      res.json({
        success:true,
        message:'otp send succesfully'
      })


    }
    catch(err){
        console.log("error occured in seding otp : ",err);
        
    }
}


//signup
exports.register = async (req,res)=>{
        try {
            const {firstName,lastName,email,password,role,otp} = req.body;
            //validate required fields
            if(!firstName || !lastName || !email || !password || !role||!otp ){
                return res.status(400).json({message: 'All fields are required'});
            }
            const emailArr =  email.split('@');
            if(emailArr.length !== 2 || !emailArr[0] || !emailArr[1]){
            return res.status(400).json({message: 'Invalid email format'});
        }
        //validate password
        if(!password || password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: 'User already exists'});
        }

        //otp verify
        //find most recent otp
        const recentOtp = await Otp.findOne({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.otp!==otp){
            return res.json({
                success:false,
                otp:recentOtp,
                message:'Otp not matched'
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //profile entry save
        const profile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            contactNumber:null,
            about:null
        })

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            
            image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
            additionalDetails:profile
        })

        return res.status(201).json({
            message: 'User registered successfully',
            data:newUser,
            success:true
        })
        } catch (error) {
           return res.status(500).json({
            message: 'Internal server error',
            error:error.message,
            success:false
           }) 
        }
}

//login
exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;
        //validate email and password
        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }
        //validate email
       const emailArr =  email.split('@');
        if(emailArr.length !== 2 || !emailArr[0] || !emailArr[1]){
            return res.status(400).json({message: 'Invalid email format'})
        }
        var user  = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        //validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
       
            return res.status(401).json({message: 'Invalid password'});
        }

        //email and password are valid so now as a server create jwt token 
        //token made from three things header,playload and signature
        //header contains information about the token type and algorithm used to sign the token
        //playload contains information about the user like id, email, role etc
        //signature is used to verify the authenticity of the token
        const payload = {
        email: user.email,
        id: user._id,
        role: user.role
    }
        //returns a string
        const token =  jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});


        user = user.toJSON();
        user.token = token; //add token to user object
        user.password = undefined; //remove password from user object  
        
        //send it in cookie
        const options = {
            httpOnly:false,
            expires:new Date(Date.now() + 3600000), //1 hour
            
        }
        res.cookie('token',token,options).status(200).json({
            message: 'Login successful',
            data:user,
            success:true})
        
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error:error.message,
            success:false
        });
    }
}


//change password
exports.changePassword = async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body;

    }
    catch(err){
        console.log(err);
        return res.status(500).json(
            {
                success:false,
                message:'Password change fails'
            }
        )
    }
}