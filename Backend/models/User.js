const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    firstName:{
            type:String,
            required:true,
            trim:true

    },
    lastName:{
            type:String,
            required:true,
            trim:true
    },
    email:{
            type:String,
            required:true,
            trim:true
    },
    password:{
            type:String,
            required:true,
    },
    role:{
            type:String,
            enum:['Student',"Instructor","Admin"],
            required:true,
    },
  
    courses:[{
         type:mongoose.Schema.Types.ObjectId,
         ref: "Course"
    }],
    additionalDetails:{
         type:mongoose.Schema.Types.ObjectId,
         ref: "Profile"
    },
    image:{
        type:String,
        //     required:true,
    },
    courseProgress:{
         type:mongoose.Schema.Types.ObjectId,
         ref: "CourseProgress"
    },
    resetToken:{
        type:String
    },
    resetPasswordExpiry:{
        type:Date
    }

})

module.exports = mongoose.model('User',userSchema);