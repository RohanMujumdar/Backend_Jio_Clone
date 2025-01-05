const {tmdbEndPoints, fetchMovieData} = require("../utility")


const getCurrent = async function(req, res) {
    try {
        const movies = await fetchMovieData(tmdbEndPoints.nowPlaying);
        return res.status(200).json({
            message: movies,
            status: "Success"
        });
    } catch (err) {
        console.error("Handler Error:", err.message); // Log error message
        res.status(500).json({
            message: 'Internal Server Error',
            status: "Failure"
        });
    }
};

const getTopRated = async function(req, res)
{
    try{

        const movies=await fetchMovieData(tmdbEndPoints.topRated)
        return res.status(200).json({
            message:movies,
            status:"Success"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:"Internal Server Error",
            status:'Failure'
        })
    }
}

const getPopular=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.popular)
        return res.status(200).json({
            message: movies,
            status:"Success"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message:"Internal Server Error",
            status:"Failure"
        })
    }
}

const getUpcoming=async function(req, res)
{
    try{
        const movies=await fetchMovieData(tmdbEndPoints.upcoming)
        res.status(200).json({
            message:movies,
            status:"Success"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            status:"Success"
        })
    }
}

const getTrending=async function(req, res)
{
    try{
        const everything=await fetchMovieData(tmdbEndPoints.trending)
        res.status(200).json({
            message:everything,
            status:"Success"
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:"Internal Server Error",
            status: "Failure"
        })
    }
}

module.exports={
    getCurrent,
    getTopRated,
    getPopular,
    getUpcoming,
    getTrending
}