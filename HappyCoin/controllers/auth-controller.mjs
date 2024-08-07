//JSDoc.app //MONGODB
import User from "../models/User.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs"; 
import { asyncHandler } from "../middleware/asyncHandler.mjs";
 
//@desc   registrete user
//@route  POST /api/v1/auth/register
//@access Public
export const register = asyncHandler( async (req, res, next) => {
    //should create a new user (name, email, password,role in system)   
    const { name, email, password, role} = req.body;
    const user= await User.create({name,email,password, role})
    // send responseJWT
    createAndSendToken(user, 201, res);
});


// @desc   logga in
// @route  POST /api/v1/auth/login
// @access PUBLIC
export const login = asyncHandler( async (req, res, next) => {
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
    
});

// @route  POST /api/v1/auth/me 
// @access PRIVATE
export const getMe = asyncHandler( async (req, res, next) => {
   const user = await User.findById(req.user.id); 
         
    res.status(200).json({
         success: true, 
         statusCode: 200, 
         message: ' getMe :))' , 
         data: user});
     if (!user) {
         return next(new ErrorResponse('User not found by id' ));
        }  
});
 

//@desc   uppdate user
//@route  PUT /api/v1/auth/update-user
//@access PRIVATE
export const updateUser = asyncHandler( async (req, res, next) => {
    const userDetailsUpdate = {
    name: req.body.name,
    email: req.body.email,    
    }

    const user = await User.findByIdAndUpdate(req.user.id, userDetailsUpdate, {
        new: true,//return new user-ALL INFO
        runValidators: true
    });
    res.status(204).json({
        success: true,  
        statusCode: 204, 
        message: 'User updated successfully', 
        data: user
    })  
}); 


//@desc   update password
//@route  PUT /api/v1/auth/update-password
//@access PRIVATE
export const  updatePassword = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        return next(new ErrorResponse('User not found by id' , 404) );
       }

    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
        return  next (new ErrorResponse( 'Wrong password', 401) )
    } 
    user.password = req.body.newPassword;
    await user.save();

    res.status(204).json({
        success: true,  

        statusCode: 204, 
        message: 'User password updated successfully', 
        data: user
    })  
  
    createAndSendToken(user, 200, res); 
      
} );



//@desc   forgot password
//@route  POST /api/v1/auth/forgot-password
//@access PUBLIC
export const  forgotPassword = asyncHandler( async (req, res, next) => {
    const   email   = req.body.email;
    if (!email) {
        return next(new ErrorResponse(`missing required fields ${email}`, 400) );
    }

    let user = await User.findOne( {email});  //mongoose find
    if (!user) {
            return next(new ErrorResponse( `User not found with this ${email} address.`, 404) );
    }
   
    //create reset token
    const resetToken = user.createResetPasswordToken(); //method User-model
    await user.save({ validateBeforeSave: false});

    //create URL for reset MSG
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
                 console.log('resetURL:_______ ', resetURL);
                 
    //send email

     const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n If you did not forget your password, please ignore this email!`
        
         
    //  try {
    //      await sendEmail({
    //         recipient: "natlisjo@gmailcom",// req.body.email,
    //         subject: 'Password reset request',
    //         message,
    //      });
    //  } catch (error) {        
    //      return next(new ErrorResponse( error.message, 500));
    //  }  
     //return response
        res
        .status(200)
        .json({ success: true, 
                statusCode: 200, 
                message: ' resetPassword :))' , 
                data: {token:resetToken, url: resetURL}});
      
} );


//@desc   reset password
//@route  PUT /api/v1/auth/reset-password/:token
//@access PUBLIC
export const resetPassword = asyncHandler( async (req, res, next)=>{   
    const password = req.body.password;
    const resetPasswordToken = req.params.token;

    if ( !password) {
        return next(new ErrorResponse(`missing required fields - ${resetPasswordToken} or ${password}`, 400) );
    }

    // taken user from DB based on resetPasswordToken
   let user = await User.findOne({ resetPasswordToken: resetPasswordToken }); 
   
    if (!user) {
        return next(new ErrorResponse(`invalid token ${resetPasswordToken}`, 400) );
    }
    
  
    // update user new password       
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;

    // save user to DB
    await user.save();
    createAndSendToken(user, 200, res);
  
    // send response
    res
    .status(200)
    .json({ success: true, 
            statusCode: 200, 
            message: ' resetPassword success:))' , 
            data: user});
 
} );


// @desc   logga ut
// @route  POST /api/v1/auth/logut
// @access Public 
export const logout = (req, res, next) => {
    res.send('logout');
}



// //helper function
const createAndSendToken = (user, statusCode, res) => {
// create token
    const token = user.getSignedJwtToken() ;
 
// send response JWT 
    res
        .status(statusCode)
        // .cookie('token', token, options)
        .json({ success: true,statusCode: 200,    token   });
 }
