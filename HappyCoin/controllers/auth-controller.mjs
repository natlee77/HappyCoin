//JSDoc.app 
import User from "../models/User.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs"; 

import { saveUser, findUserByEmail, findUserById } from "../data/fileDb.mjs";
import { generateToken, matchPassword } from "../utilities/security.mjs";
 

//@desc   registrete user
//@route  POST /api/v1/auth/register
//@access Public
export const register =  async (req, res, next) => {
    //should create a new user (name, email, password,role in system)    
    const{ name, email, password, role} = req.body;
    //validation
    if (!name || !email || !password ) {
        return next(new ErrorResponse(`missing required fields name:${name}, email:${email},password: ${password}`))            
    }
    // create a new user    
    const  user = new User({ name, email, password,  role :  role ?? 'user'});  
    // save user to database     
    await saveUser( user );
    // send responseJW
    createAndSendToken(user.id, 201, res);     
};


// @desc   logga in
// @route  POST /api/v1/auth/login
// @access PUBLIC
export const login = async (req, res, next) => {
    // validate email and password
     const { email, password } = req.body;
     if (!email || !password) {
        return next(new ErrorResponse(`missing required fields ${email}, ${password}`) );  
    }
    //taken user  from DB
    try {
    const user =  await findUserByEmail( email );   
    
    // validation password
    const isMatch = await matchPassword(password , user.password);  
    if (!isMatch) {
        return  next (new ErrorResponse( 'Wrong password'))  
    }

    // generate and send  new token
    createAndSendToken(user.id, 200, res);      

   //   email validation  
    if (!user) {
        return next(new ErrorResponse('User not found' , 401) );
        //  res.status(401).json({
        //     success: false, 
        //     statusCode: 401,
        //     message: 'User not found',
        // })  
    }   

    } catch (error) {
        return res.status(500).json({
            success: false, 
            statusCode: 500,
            message: error.message,
        })  
    }



}

// @desc  return logat in  user-info  
// @route  POST /api/v1/auth/me 
// @access PRIVATE
///?????????????????????????????????
export const getMe = async (req, res, next) => {
    
    try {
    const user = await findUserById(req.user.id);
    console.log('user:____getme_______ ', user);
         
    res
    .status(200)
    .json({ success: true, statusCode: 200, message: ' getMe :))' , data: user});
    //     if (!user) {
    //         return next(new ErrorResponse('User not found by id' ) ); 
    //     }  
    } catch (error) {
        return res.status(404).json({
            success: false, 
            statusCode: 404,
            message: error.message,
        })  
    }   
   
}





// @desc   logga ut
// @route  POST /api/v1/auth/logut
// @access Public
 
export const logout = (req, res, next) => {
    res.send('logout');
}



//helper function
const createAndSendToken = (userId, statusCode, res) => {
    // create token
    const token =  generateToken(userId);
    
    //set
    const  options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_TTL  * 24 * 60 * 60 * 1000//HOURS * MINUTES * SECONDS * MILLISECONDS
        ),
        httpOnly: true  
    }
    // send response JWT 
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true,statusCode: 200,    token   });
}
