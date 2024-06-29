import jwt from 'jsonwebtoken';
import { readFileAsync } from '../utilities/fileHandler.mjs';


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

        return res
            .status(401)
            .json({ success: false, statusCode: 401, message: ' access denied - no token provided'});
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
        return res
           .status(401)
           .json({ success: false, statusCode: 401, message: error.message});   
    }


    next();
 }