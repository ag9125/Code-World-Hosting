const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
            type:String,
            enum:['Male','Female','Non-Binary','Other','Prefer not to say']

    },
    contactNumber:{
            type:Number,
            trim:true
            
    },
   dateOfBirth:{
    type:Date
   },
   about:{
    type:String,
    trim:true
   }
})

module.exports = mongoose.model('Profile',profileSchema);