//return auth isUser isAdmin
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,res,next)=>{
        // if cookie is present to client then for every request cookie will be sent to server
        console.log(req.cookies.token);
        const token = 
  req?.cookies?.token || 
  req?.body?.token || 
  (req?.headers?.authorization?.startsWith("Bearer ") 
    ? req.headers.authorization.split(" ")[1] 
    : undefined);

        if(!token){
            return res.status(401).json({
                message: 'Unauthorized access, please login',
                success: false
            });
        }
        try {
            //verify token using jwt.vwrify(token,secret_key)mif token is invalid then it throws an error\
            //if token is valid then decode the token and get payload
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            //if token is valid then add user to request object
            req.user = decode;
            next(); //call next middleware or route handler
        } catch (error) {
            return res.status(401).json({
                message: 'token is invalid or expired',
                error: error.message,
                success: false

            });
            
        }
}
exports.isStudent = (req,res,next)=>{
        if(req.user.role!== 'Student'){
            return res.status(403).json({
                message: 'Access denied, you are not a Student',
                success: false
            });
        }
        next(); //call next middleware or route handler
        
}
exports.isInstructor = (req,res,next)=>{
        if(req.user.role!== 'Instructor'){
            return res.status(403).json({
                message: 'Access denied, you are not a Instructor',
                success: false
            });
        }
        next(); //call next middleware or route handler
        
}
exports.isAdmin = (req,res,next)=>{
        if(req.user.role !== 'Admin'){
            return res.status(403).json({
                message: 'Access denied, you are not an admin',
                success: false
            });
        }
        next(); //call next middleware or route handler
}
