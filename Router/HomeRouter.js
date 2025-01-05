const express=require("express")
const HomeRouter=express.Router()

const { getCurrent, getTopRated, getPopular, getUpcoming, getTrending} = require("../Controller/HomeController");


/********* User Routes **********/

HomeRouter

    .get("/current", getCurrent)
    .get("/toprated", getTopRated)
    .get("/popular", getPopular)
    .get("/upcoming", getUpcoming)
    .get("/trending", getTrending)

module.exports=HomeRouter
