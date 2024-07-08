import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
 //for Mongo DB all method moved to User-model.js

// export const generateToken = (id) => {
//    //3 del
//     return jwt.sign(
//         { id }, 
//         process.env.JWT_SECRET, 
//         { expiresIn:  process.env.JWT_TTL }
//     );
    
// }


// export const hashPassword = (password) => {
//     const salt = bcrypt.genSaltSync(8);//8-salt rounds
//     const hash = bcrypt.hashSync(password, salt); 
//     return hash;
// }

// export const matchPassword = async(passwordCheck, userPassword) => {
//     return await  bcrypt.compare(passwordCheck, userPassword); //true or false
    
// }