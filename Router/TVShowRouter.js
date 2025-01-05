const express=require("express")
const TVShowRouter=express.Router()

const { getActionTVShows, getComedyTVShows, getMysteryTVShows, getDramaTVShows, getCrimeTVShows} = require("../Controller/TVShowController");


/********* User Routes **********/

TVShowRouter
    .get("/action", getActionTVShows)
    .get("/comedy", getComedyTVShows)
    .get("/mystery&horror", getMysteryTVShows)
    .get("/romance&drama", getDramaTVShows)
    .get("/crime", getCrimeTVShows)

module.exports=TVShowRouter
