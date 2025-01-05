const {tmdbEndPoints, fetchMovieData} = require("../utility")
const MovieModel=require("../Model/MovieModel")


const createMovie = async function(req, res)
{
    try{
        const movie=req.body
        const createdMovie=await MovieModel.create(movie)

        res.status(201).json({
            message: createdMovie,
            status:"Success"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


const getAllMovies=async function(req, res)
{
    try{
        const movies=await MovieModel.find();
        if(!movies)
        {
            return res.status(404).json({
                message:"Internal Server Error",
                status:"Success"
            })
        }
        res.status(200).json({
            message: movies,
            status:"Success"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:"Internal Server Error",
            status:"Failure"
        })
    }
}

const getMovieById = async function (req, res) {
    try {
        const movieId=req.params.movieId
        const movie = await MovieModel.findById(movieId)
        if (movie) {
            res.status(200).json({
                message: movie,
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

const updateMovieById = async function (req, res) {
    try {
        const movie = await MovieModel.findByIdAndUpdate(req.params.movieId, req.body,
            { new: true, runValidators: true } // Return updated user, and run schema validators
        )
        if (movie) {
            res.status(200).json({
                message: movie,
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

const deleteMovieById = async function (req, res) {
    try {
        const movie = await MovieModel.findByIdAndDelete(req.params.movieId)
        if (movie) {
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

const getActionMovies=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchActionMovies)
        res.status(200).json({
            message: movies,
            status: "Success"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status: "Failure"
        })
    }
}

const getComedyMovies=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchComedyMovies)
        res.status(200).json({
            message: movies,
            status: "Success"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status: "Failure"
        })
    }
}

const getHorrorMovies=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchHorrorMovies)
        res.status(200).json({
            message: movies,
            status: "Success"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status: "Failure"
        })
    }
}

const getRomanceMovies=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchRomanceMovies)
        res.status(200).json({
            message: movies,
            status: "Success"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status: "Failure"
        })
    }
}

const getAnimeMovies=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchAnimeMovies)
        res.status(200).json({
            message: movies,
            status: "Success"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status: "Failure"
        })
    }
}


module.exports={
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getAnimeMovies
}