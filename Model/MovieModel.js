const mongoose=require("mongoose")

/**********Movie Schema ********/
const movieUserSchema={
    title:{
        type:String,
        required: [true,"Title is required"]
    },
    description:{
        type: String,
        required: [true,"Description is required"]
    },
    releaseYear:{
        type:Number,
        required: [true,"Release Year is required"]
    },
    genre:{
        type:String,
        required:[true, "Genre is required"],
        enum:["Drama", "Comedy", "Action","Other"]
    },
    rating:{
        type:Number,
        min:[1,"Cannot be less than 1."],
        max:[5,"Cannot be more than 5."]
    },
    cast:{
        type:[String]
    },
    director:{
        type: String
    },
    thumbnail:{
        type:String
    },
    trailerLink:{
        type:String
    },
    isPremium:{
        type:Boolean,
        required: true,
        default: false
    }
}

const movieSchema=new mongoose.Schema(movieUserSchema)
const MovieModel=mongoose.model("movie", movieSchema)

module.exports=MovieModel


