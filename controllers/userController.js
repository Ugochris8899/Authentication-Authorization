const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

// to signup
const userSignUp = async(req, res) =>{
    try {
        const {username, email, password} = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        const data = {
            username,
            email,
            password: hashedPassword
        }
        const createUser = await userModel.create(data)
        const token = jwt.sign({
            id: createUser._id,
            password: createUser.password

        }, process.env.secretKey,{expiresIn:"1d"}
        )
        createUser.token = token
        createUser.save()

        res.status(201).json({
            message: "New user has been created",
            data: createUser
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}


// to log in
const userLogin = async(req,res) => {
    try {
        // const {username, password} = req.body
        const checkUsername = await userModel.findOne({$or:[{username:req.body.username},{email:req.body.email}]})

        
        if(!checkUsername)
       return res.json("Username or password not correct")
        const userPassword=req.body.password
        const checkPassword = bcrypt.compareSync(userPassword, checkUsername.password)
        if(!checkPassword)
        return res.json("Invalid password")

        const usertoken = jwt.sign(
            {
                id: checkUsername._id,
                password: checkUsername.password

        }, process.env.secretKey,{expiresIn:"1d"}
        )

        checkUsername.token = usertoken
        checkUsername.save()

        
        res.json({message: "Login successful",
    data: checkUsername})


    } catch (error) {
       res.status(500).json(error.message) 
    }
}

const oneUser = async(req,res)=>{
   try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId)

    res.status(200).json({
        message: "user available",
        data: user
    })
   } catch (error) {
    res.status(404).json({
        message: error.message
    })
   }
}

const allUsers = async(req,res)=>{
    try {
        const users = await userModel.find()
        res.status(200).json({
            message: "Users available are "+ users.length,
            data: users
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}

// update admin
const Admin = async(req, res) =>{
    try {
        const adminId = req.params.adminId;
        const Admin = await userModel.findByIdAndUpdate(adminId,{isAdmin: true}, {new:true})
        
        res.status(201).json({
            message: "Admin updated successfully",
            data: Admin
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
    // update
const update = async(req, res) =>{
    try {
        const userId = req.params.userId;
        const updated = await userModel.findByIdAndUpdate(userId, req.body, {new:true})
        if (!update) {
        res.status(404).json({
            message: "Unable to update user",
            
        })
    } else {
        res.status(200).json({
            message: "updated successfully",
            data: updated
        })
    }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const deleteUser = async(req, res) =>{
    try {
       const userId = req.params.userId
        const deleteUser = await userModel.findByIdAndDelete(userId)
        if (!deleteUser) {
        res.status(404).json({
            message: "Unable to delete user",
        })
    
    } else {
        res.status(200).json({
            message: "deleted successfully",
            data: deleteUser
        })
    }
} catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


module.exports = {
    userSignUp,
    userLogin,
    oneUser,
    allUsers,
    Admin,
    update,
    deleteUser
}
