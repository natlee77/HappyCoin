//JSDoc.app 
import User from "../models/User.mjs";
import { saveUser } from "../data/fileDb.mjs";
import { generateToken } from "../utilities/security.mjs";

//@desc   registrete user
//@route  POST /api/v1/auth/register
//@access Public
export const register =  async (req, res, next) => {
    //should create a new user (name, email, password,role in system)    
    const{ name, email, password, role} = req.body;
    //validation
    if (!name || !email || !password ) {
        return res
            .status(400)
            .json({ success: false,
                    statusCode: 400, 
                    message: `missing required fields ${name}, ${email}, ${password}`});  
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
// @access Public
export const login = (req, res, next) => {
    
    console.log('login________________',req.body);
    res
        .status(201)
        .json({ success: true,statusCode: 201, message: 'logat in :))' });
    
}


// @desc  return logat in  user-info  
// @route  POST /api/v1/auth/me 
// @access Public

export const getMe = (req, res, next) => {
    console.log(' getMe________________',req.body);
    res
       .status(201)
       .json({ success: true,statusCode: 201, message: ' getMe :))' });
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
    console.log('token:___________ ', token);
    
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
        .json({ success: true,statusCode: 201,    token   });
}
