//JSDoc.app //MONGODB
import User from "../models/User.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs"; 
 
//@desc   registrete user
//@route  POST /api/v1/auth/register
//@access Public
export const register =  async (req, res, next) => {
    //should create a new user (name, email, password,role in system)   
    const { name, email, password, role} = req.body;
    const user= await User.create({name,email,password, role})
    // send responseJWT
    createAndSendToken(user, 201, res);
         
};


// // @desc   logga in
// // @route  POST /api/v1/auth/login
// // @access PUBLIC
export const login = async (req, res, next) => {
    const { email, password } = req.body;
// validate email and password    
     if (!email || !password) {
        return next(new ErrorResponse(`missing required fields ${email}, ${password}`,400) );  
    }

//taken user  from mongoose DB by email   
    const user =  await User.findOne({ email} ).select('+password');   
   if (!user) {
        return next(new ErrorResponse('User not found' , 401) );        
    }
// validation password
    const isMatch = await user.matchPassword(password );  

    if (!isMatch) {
        return  next (new ErrorResponse( 'Wrong password', 401) )  
    }
     
  //  generate and send  new JWTtoken
    createAndSendToken(user, 200, res);     
    
}

// // @desc  return logat in  user-info  
// // @route  POST /api/v1/auth/me 
// // @access PRIVATE
// export const getMe = async (req, res, next) => {
    
//     try {
//     const user = await findUserById(req.user.id);
//     console.log('user:____getme_______ ', user);
         
//     res
//     .status(200)
//     .json({ success: true, statusCode: 200, message: ' getMe :))' , data: user});
//     //     if (!user) {
//     //         return next(new ErrorResponse('User not found by id' ) ); 
//     //     }  
//     } catch (error) {
//         return res.status(404).json({
//             success: false, 
//             statusCode: 404,
//             message: error.message,
//         })  
//     }   
   
// }



// //@desc   forgot password
// //@route  PUOST /api/v1/auth/forgot-password
// //@access PUBLIC
// export const  forgotPassword = async (req, res, next) => {
//     const   email   = req.body.email;

//     if (!email) {
//         return next(new ErrorResponse(`missing required fields ${email}`, 400) );
//     }
//     let user = await findUserByEmail(email);
    
//     if (!user) {
//             return next(new ErrorResponse( `User not found with this ${email} address.`, 404) );
//     }
   
//     //create reset token
//     user = await getResetPasswordToken(user.id);
//     //create URL for reset MSG
//     const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${user.resetPasswordToken}`;
//                  console.log('resetURL:_______ ', resetURL);
                 
//     //send email

//      const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n If you did not forget your password, please ignore this email!`
        
         
//      try {
//          await sendEmail({
//             recipient: "natlisjo@gmailcom",// req.body.email,
//             subject: 'Password reset request',
//             message,
//          });
//      } catch (error) {        
//          return next(new ErrorResponse( error.message, 500));
//      }  
//      //return response
//         res
//         .status(200)
//         .json({ success: true, statusCode: 200, message: ' resetPassword :))' , data: user});
      
// }




// //@desc   reset password
// //@route  PUT /api/v1/auth/reset-password/:token
// //@access PUBLIC
// export const resetPassword =async (req, res, next)=>{
   
//   try {
//     const resetPasswordToken =req.params.token;
//     const password = req.body.password;

//     if (!resetPasswordToken || !password) {
//         return next(new ErrorResponse(`missing required fields ${resetPasswordToken} or ${password}`, 400) );
//     }

//     // taken user from DB based on resetPasswordToken
//     const user = await findUserByResetPasswordToken(resetPasswordToken);
//     // generate new hashed password
//     const hashedPassword = hashPassword(password);
//     // update user new password
//     user.password = hashedPassword;
//     user.resetPasswordToken = null;
//     user.resetPasswordTokenExpire = null;

//     // save user to DB
//     await updateUser(user);

//     // send response
//     res
//     .status(200)
//     .json({ success: true, statusCode: 200, message: ' resetPassword success:))' , data: user});
// }catch (error) {
//     return next(new ErrorResponse( error.message, 500) );
// }

// }


// // @desc   logga ut
// // @route  POST /api/v1/auth/logut
// // @access Public
 
// export const logout = (req, res, next) => {
//     res.send('logout');
// }



// //helper function
const createAndSendToken = (user, statusCode, res) => {
// create token
    const token = user.getSignedJwtToken() ;
 
//     // send response JWT 
    res
        .status(statusCode)
        // .cookie('token', token, options)
        .json({ success: true,statusCode: 200,    token   });
 }
