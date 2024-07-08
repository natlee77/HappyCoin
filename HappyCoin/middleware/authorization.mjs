import jwt from 'jsonwebtoken';
import ErrorResponce from '../models/ErrorResponseModel.mjs';
import User from '../models/User.mjs';
import { asyncHandler } from './asyncHandler.mjs';

 export const protect = asyncHandler( async (req, res, next) => {
    let token;
    //verifiering request headers
    if ( req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')) 
      {
        token = req.headers.authorization.split(' ')[1];       
      }
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    if (!token) {
        return next(new ErrorResponce(' access denied - no token provided', 401)); 
    }
    //verifiering token from header    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);         
    req.user = await User.findById(decoded.id);   
    if(!req.user) {     
        return next(new ErrorResponce('access denied - user not found', 404));  
    }   
    next();
 } );


 export const authorize = (...roles) => {  
    
    return (req, res, next) => {
        console.log('roles:___________ ', req.user.role);
        if (!roles.includes(req.user.role)) {
            return  next(new ErrorResponce(false, 403, `access denied for user role- ${req.user.role}` )); 
        }
        next();
    };
 }