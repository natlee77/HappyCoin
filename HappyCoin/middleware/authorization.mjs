import jwt from 'jsonwebtoken';
import { readFileAsync } from '../utilities/fileHandler.mjs';
 import ErrorResponce from '../models/ErrorResponseModel.mjs';


 export const protect = async (req, res, next) => {
    let token;
    //verifiering request headers
    if (
        req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')) 
         {
        token = req.headers.authorization.split(' ')[1];
       
    }
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    if (!token) {

        return next(new ErrorResponce(' access denied - no token provided', 401));
        // res
        //     .status(401)
        //     .json({ success: false, statusCode: 401, message: ' access denied - no token provided'});
    }
    //verifiering token from header
    try {
        
       console.log('JWT_SECRET:___________ ', process.env.JWT_SECRET);
       const decoded = jwt.verify(token, process.env.JWT_SECRET);  
       const users = await readFileAsync( 'data', 'users.json');
       
       console.log('decoded:___________ ', decoded);
       
       //putting user in request object 
       req.user = users.find((user) => user.id === decoded.id);
       
       
     
    } catch (error) {
        return next(new ErrorResponce(error.message, 401));
        // return res
        //    .status(401)
        //    .json({ success: false, statusCode: 401, message: error.message});   
    }


    next();
 }


 export const authorize = (...roles) => {  
    
    return (req, res, next) => {
        console.log('roles:___________ ', req.user.role);
        if (!roles.includes(req.user.role)) {
            return  next(new ErrorResponce(false, 403, `access denied for user role- ${req.user.role}` ));
            
            
            
            // res
            //     .status(403)
            //     .json({ success: false, statusCode: 403, message: 'access denied'});
        }
        next();
    };
 }