const {tmdbEndPoints, fetchMovieData} = require("../utility")

const getActionTVShows=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchActionTvShows)
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

const getComedyTVShows=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchComedyTvShows)
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

const getMysteryTVShows=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchMysteryTvShows)
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

const getDramaTVShows=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchDramaTvShows)
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

const getCrimeTVShows=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.fetchCrimeTvShows)
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
    getActionTVShows,
    getComedyTVShows,
    getMysteryTVShows,
    getDramaTVShows,
    getCrimeTVShows
}