const express=require("express")
const AuthRouter=express.Router()



const {signUp, login, protectedRoute, isAdminLogin, finalLogin, logoutHandler, forgetPasswordHandler, resetPasswordHandler, getAllUsers}=require("../Controller/AuthController")



/********* Auth Routes **********/

AuthRouter
    .post("/signUp", signUp)
    .post("/login",login)
    .get("/profileLogin",protectedRoute,isAdminLogin,finalLogin)
    .get("/logout", logoutHandler)
    .patch("/forgetPassword", forgetPasswordHandler)
    .patch("/resetPassword/:userId", resetPasswordHandler)
    .get("/",getAllUsers)
    

module.exports=AuthRouter

