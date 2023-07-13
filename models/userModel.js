const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:
    {
        type:String, 
        required:true ["username is required"],
        unique:true
    },
    email:
    {
        type:String, 
        required:true ["email is required"],
        unique:true,
        lowercase: true
    },
    password:
    {
        type:String, 
        required:true ["password is required"],
        unique:true,
        minLength: 6
    },
    token:
    {
        type:String
    },
    isAdmin: 
    {
        type:Boolean, 
        default: false
    },
    isSuperAdmin: 
    {
        type:Boolean, 
        default: false
    }
});

const userModel = mongoose.model("user",userSchema );

module.exports = userModel