import bcrypt from 'bcryptjs';


export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(8);//8-salt rounds
    const hash = bcrypt.hashSync(password, salt); 
    return hash;
}