const express=require("express")
const MovieRouter=express.Router()

const { createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById, getActionMovies, getComedyMovies, getHorrorMovies, getRomanceMovies, getAnimeMovies} = require("../Controller/MovieController");


/********* User Routes **********/

MovieRouter
    .post("/", createMovie)
    .get("/",getAllMovies)
    .get("/action", getActionMovies)
    .get("/comedy", getComedyMovies)
    .get("/horror", getHorrorMovies)
    .get("/romance", getRomanceMovies)
    .get("/anime", getAnimeMovies)
    .get("/:movieId",getMovieById)
    .patch("/:movieId",updateMovieById)
    .delete("/:movieId",deleteMovieById)
    

module.exports=MovieRouter
