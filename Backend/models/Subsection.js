const mongoose = require('mongoose');

const subsectionSchema = new mongoose.Schema({
    title:{
            type:String,
            trim:true,
            required:true

    },
    description:{
            type:String,
            trim:true,
            required:true           
    },
    videoUrl:{
            type:String,
            trim:true,
            required:true 
    },
    timeDuration:{
        type:String
    }
})

module.exports = mongoose.model('Subsection',subsectionSchema);