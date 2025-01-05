const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const UserModel=require("../Model/userModel")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const util=require("util")
const { error } = require("console")
const promisify=util.promisify
const promisdiedJWTsign=promisify(jwt.sign)
const promisdiedJWTverify=promisify(jwt.verify)
const emailSender=require("../Email/dynammicEmailSender")


// Use cookie-parser middleware
app.use(cookieParser());
// const SECRET_KEY="sfdfhbkd"
const SECRET_KEY=process.env.SECRET_KEY

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const signUp = async function (req, res) {
    try {
        const userObject=req.body
        if(!userObject.email || !userObject.password)
        {
            return res.status(400).json({
                message:"Required parameters are missing",
                status: "failure"
            })
        }
        
        const user=await UserModel.findOne({email:userObject.email})
        if(user)
        {
            return res.status(409).json({
                message:"User already exists",
                status: "failure",
            })
        }

        const newUser= await UserModel.create(userObject)

        return res.status(201).json({
            message: "New User added",
            status: "Success"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error",
            Error: err
        })
    }
}


const login = async function (req, res) {
    try {
        const{email, password}=req.body
        const user=await UserModel.findOne({email})
        if(!user)
        {
            return res.status(404).json({
                message: "Invalid email or password",
                status: "Failure"
            })
        }

        if(password!=user.password)
        {
            return res.status(404).json({
                message: "Invalid email or password",
                status: "Failure"
            })
        }
        
        const authToken = await promisdiedJWTsign({ "payload": user._id }, SECRET_KEY)
        res.cookie("jwt", authToken, {
                        maxAge: 1000 * 60 * 60 * 24,
                        httpOnly: true //it can only be accessed via server
                    })
        
        res.status(200).json({
            message: "Successfully Logged-In",
            status: "Successful",
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            Error: err
        })
    }
}


const protectedRoute = async function (req, res, next) {
    try {
        const authToken=req.cookies.jwt
        if(!authToken)
        {
            return res.status(400).json({
                message: "No Token Found",
                status: "Failure"
            })
        }

        const decryptedToken=await promisdiedJWTverify(authToken, process.env.SECRET_KEY)
        const user=await UserModel.findOne({email: req.body.email})
        req.id=user.id
        next()
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error",
            Error: err
        })
    }
}


const isAdminLogin = async function (req, res, next)
{
    try{
        const userId=req.id
        const user=await UserModel.findById(userId)
        if(user.role!=="admin")
        {
            return res.status(403).json({
                message:"You are un-authorized",
                status: "Failure"
            })
        }
        else
        {
            next()
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error",
            Error: err
            
        })
    }
}


const finalLogin = async function(req,res)
{
    try{
        const userId=req.id
        const user=await UserModel.findById(userId)
    
        if(!user)
        {
            return res.status(404).json({
                message: "User Not Found"
            })
        }
    
        res.status(200).json({
            message: "Successfully Logged-In",
            status: "Successful"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error",
            Error: err
        })
    }
}

const logoutHandler = async function(req, res)
{
    try{
        res.clearCookie('jwt',{path:"/"})
        res.status(200).json({
            message: "Cookies cleared"
        })
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}

const getAllUsers = async function(req, res)
{
    try{
        const users=await UserModel.find();
        if(users)
        {
            res.status(200).json({
                message: users,
                status: "successful"
            })
        }
        else{
            res.status(404).json({
                message: "Not Found",
                status: "failure"
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            message: "Internal Server Error",
            status: "Unsuccessful"
        })
    }
}


const forgetPasswordHandler = async function(req, res){
    try{
        const {email}=req.body
        if(!email)
        {
            return res.status(400).json({
                message:"Bad Request",
                status:"My Failure"
            })
        }

        const user=await UserModel.findOne({email})
        if(!user)
        {
                return res.status(404).json({
                    message: "User Not Found",
                    status: "Failure"
                })
        }

        const otp=generateOTP()
        
        user.otp=otp
        user.otpExpire=Date.now()+1000*60*10

        await user.save({validateBeforeSave:false})

        res.status(200).json({
            message:"Otp sent successfully",
            status:"Successful",
            otp:otp,
            resetURL:`http://localhost:3000/api/auth/resetPassword/${user.id}`
        })
        
        const toReplaceObject={
            otp: user.otp,
            name: user.name
        }
        await emailSender("templates/otp.html", email, toReplaceObject)
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            status: "Failure"
        })
    }
}

const resetPasswordHandler = async function(req, res){
    try{    

        let resetDetails=req.body
        if(!resetDetails.password || !resetDetails.confirmPassword || !resetDetails.otp ) 
        {
            return res.status(401).json({
                message: "Bad Request, required parameters are missing",
                status: "Failure"
            })
        }

        if(resetDetails.password!=resetDetails.confirmPassword)
        {
            return res.status(401).json({
                message:"Your Password does not match the Confirm Password.",
                status:"Failure"
            })
        }

        const userId=req.params.userId

        const user=await UserModel.findById(userId)
        
        if(!user )
        {
            return res.status(404).json({
                message:"User not found",
                status:"Failure"
            })
        }
        
        if(!user.otp || user.otp!=resetDetails.otp)
        {
            return res.status(401).json({
                message:"Invalid OTP",
                status:"Failure"
            })
        }

        if(Date.now()>user.otpExpire)
        {
            return res.status(401).json({
                message:"Your OTP has expired.",
                status:"Failure"
            })
        }

        const passwordValidation = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).+$/.test(resetDetails.password);
        if (!passwordValidation) {
            return res.status(400).json({
                message: "Password should contain at least one number and one special character.",
                status: "Failure"
            });
        }
        
        user.password=resetDetails.password
        user.confirmPassword=resetDetails.confirmPassword

        user.otp=undefined
        user.otpExpire=undefined
        await user.save()

        res.status(200).json({
            message:"Password has been reset successfully",
            status:"Success"
        })

    }   

    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status:"Failure"
        })
    }
}


module.exports={
    signUp,
    login,
    protectedRoute,
    isAdminLogin,
    finalLogin,
    logoutHandler,
    forgetPasswordHandler,
    resetPasswordHandler,
    getAllUsers
}

