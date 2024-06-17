import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
 

export const generateToken = (id) => {
   //3 del
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET, 
        { expiresIn:  process.env.JWT_TTL }
    );
    
}


export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8);//8-salt rounds
    const hash = bcrypt.hashSync(password, salt); 
    return hash;
}

export const matchPassword = async(passwordCheck, password) => {
    return await  bcrypt.compare(passwordCheck, password); //true or false
    
}