 
import mongoose from "mongoose";  
import bcrypt from 'bcryptjs';

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
    resetPasswordTokenExpire: Date
  });

  //hash password for MongoDB
  userSchema.pre('save', async function(next) { 
    if(!this.isModified('password')) {
        next();
    }//if update user 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
     
  });

export  default mongoose.model("User", userSchema);
