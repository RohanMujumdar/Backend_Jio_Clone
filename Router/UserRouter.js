const express=require("express")
const UserRouter=express.Router()

const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require("../Controller/UserController");


/********* User Routes **********/

UserRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:uniqueId", getUserById)
    .patch("/:uniqueId", updateUserById)
    .delete("/:uniqueId", deleteUserById)

module.exports=UserRouter
