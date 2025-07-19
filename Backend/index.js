const express = require('express');
const app = express();
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const Contact = require('./routes/Contact')
const Course = require('./routes/Course')
const Payments = require('./routes/Payments')
const Profile = require('./routes/Profile')
const User = require('./routes/User')
const {dbConnect} =require('./config/database')
const cloudinaryConnect = require('./config/cloudinary')

require('dotenv').config();
PORT = process.env.PORT||8000

//middlewares
app.use(cors({
    origin:'http://localhost:3000', // Adjust the origin as needed
    credentials: true // Allow credentials if needed

}));
//1-json parser
app.use(express.json());
//2-urlencoded parser
// app.use(express.urlencoded({ extended: true }));

//3-static files
// app.use(express.static('public'));
//4-cookie
app.use(cookie_parser());

//5-file upload
app.use(fileUpload({
     limits: { fileSize: 500 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

//6 -routes mouting
app.use('/api/v1/Course',Course);
app.use('/api/v1/Contact',Contact);
app.use('/api/v1/Payments',Payments);
app.use('/api/v1/Profile',Profile);
app.use('/api/v1/User',User);


app.listen(PORT,()=>{
    console.log("Server Running At port number : ",PORT)
})

//db connectiondb
dbConnect()
cloudinaryConnect()


// const sendMail = require('./utils/mailSender')
// const {courseEnrollmentEmail} =require('./mail/templates/courseEnrollmentEmail')
// sendMail('123102179@nitkkr.ac.in',"ankit na bhaja ha ",courseEnrollmentEmail('Nishant','Ankit gupta'))


