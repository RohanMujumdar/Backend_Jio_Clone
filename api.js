
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const util=require("util")
const { error } = require("console")
const promisify=util.promisify
const promisdiedJWTsign=promisify(jwt.sign)
const promisdiedJWTverify=promisify(jwt.verify)


const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mn0cb.mongodb.net/jio_clone?retryWrites=true&w=majority&appName=Cluster0`;

const SECRET_KEY=process.env.SECRET_KEY


mongoose.connect(dbLink)
    .then(function(connection){
        console.log("connected to db")
    }).catch(err=>console.log(err))


/********* Routes and there Handlers **********/

// app.post("/api/auth/signUp", signUp)
// app.post("/api/auth/login",login)
// app.patch("/api/auth/forgetPassword", forgetPasswordHandler)
// app.patch("/api/auth/resetPassword/:userId", resetPasswordHandler)
// app.get("/api/auth/getAllUsers", getAllUsers)


// /********* Home Routes **********/
// app.get("/api/home/currentPlaying", getCurrent)
// app.get("/api/home/topRated", getTopRated)
// app.get("/api/home/popular", getPopular)
// app.get("/api/home/upComing", getUpcoming)

// /********* Movie Routes **********/
// app.get("/api/movie/action", getActionMovies)
// app.get("/api/movie/comedy", getComedyMovies)
// app.get("/api/movie/horror", getHorrorMovies)
// app.get("/api/movie/romance", getRomanceMovies)
// app.get("/api/movie/anime", getAnimeMovies)

// /********* TV Show Routes **********/
// app.get("/api/tv/action", getActionTVShows)
// app.get("/api/tv/comedy", getComedyTVShows)
// app.get("/api/tv/mystery", getMysteryTVShows)
// app.get("/api/tv/drama", getDramaTVShows)
// app.get("/api/tv/crime", getCrimeTVShows)



/********* Routes **********/
app.use(express.json())
app.use(cookieParser());
const AuthRouter=require("./Router/AuthRouter")
const HomeRouter=require("./Router/HomeRouter")
const MovieRouter=require("./Router/movieRouter")
const TVShowRouter=require("./Router/TVShowRouter")
const UserRouter=require("./Router/UserRouter")


app.use("/api/auth", AuthRouter)
app.use("/api/home", HomeRouter)
app.use("/api/movie", MovieRouter)
app.use("/api/tvshow", TVShowRouter)
app.use("/api/user", UserRouter)


app.listen(3000, function(){
    console.log("Server started at port 3000.")
})




