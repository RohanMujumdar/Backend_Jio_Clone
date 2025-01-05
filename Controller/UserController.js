const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const UserModel=require("../Model/UserModel")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const util=require("util")
const { error } = require("console")
const promisify=util.promisify
const promisdiedJWTsign=promisify(jwt.sign)
const promisdiedJWTverify=promisify(jwt.verify)


// Use cookie-parser middleware
app.use(cookieParser());
const SECRET_KEY="sfdfhbkd"


/****** Handler Functions *******/
const createUser = async function (req, res) {
    try {
        const userObject = req.body
        const user = await UserModel.create(userObject)
        // res.status(201).json({
        //     message: "New User created",
        //     body: userObject
        // })
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

const getAllUsers = async function (req, res) {
    try {
        const allUsers = await UserModel.find();
        if (allUsers) {
            res.status(200).json({
                message: allUsers
            })
        }
        else {
            res.status(404).json({
                message: "404 Not Found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

const getUserById = async function (req, res) {
    
    try {
        const user = await UserModel.findById(req.params.uniqueId)
        if (user) {
            
            res.status(200).json({
                message: user,
            })
        }
        else {
            res.status(404).json({
                message: "404 Not Found",
                error: err
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}


const updateUserById = async function (req, res) {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.uniqueId, req.body,
            { new: true, runValidators: true } // Return updated user, and run schema validators
        )
        if (user) {
            res.status(200).json({
                message: user,
            })
        }
        else {
            res.status(404).json({
                message: "404 Not Found",
                error: err
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

const deleteUserById = async function (req, res) {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.uniqueId)
        if (user) {
            res.status(200).json({
                message: "Successfully deleted"
            })
        }
        else {
            res.status(404).json({
                message: "404 Not Found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

module.exports={
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}