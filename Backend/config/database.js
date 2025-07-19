const mongoose = require('mongoose');
require('dotenv').config();
const dbURI = process.env.DATABASE_URL;
exports.dbConnect = async ()=>{
    try {
        mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log('Database connected successfully');
        }).catch((error) => { 
            console.error('Database connection error:', error);
        });
    } catch (error) {
        console.log('Database connection failed:', error);
    }
}