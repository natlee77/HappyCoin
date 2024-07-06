// import { v4 as uuidv4 } from 'uuid';
// import {hashPassword} from '../utilities/security.mjs';
import mongoose from "mongoose";  


 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[ true, 'Please add a name']
    },
    email: {
        type: String,
        required:  [true, 'Please add an email'],
        unique: true,
        match:  [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: true ,
        minlength: 4,
        select : false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'miner'],
        default  : 'user'  
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
//     constructor({ name, email, password, role }) {
//         this.id =  uuidv4().replace('-', ' ');
//         this.name = name;
//         this.email = email;
//         this.password =  hashPassword(password);
//         this.role = role;
//         this.createdAt =   Date.now();  
//         this.resetPasswordToken = null; 
//         this.resetPasswordTokenExpire = null;     
//     }
  });

export  default mongoose.model("User", userSchema);
