 
import mongoose from "mongoose";  
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
//method for VALIDATE password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


// method for generate JWT token
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TTL
    });
}

export  default mongoose.model("User", userSchema);
