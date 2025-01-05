const mongoose=require("mongoose")

/*****User Schema*****/
//Set of rules
const schemaRules={
    name:{
        type: String,
        required: [true, "Should be a string."]
    },

    email:{
        type:String,
        required:[true, "Email is required."],
        unique:[true, "Email shoud be unique"]
    },

    password:{
        type:String,
        required:[true,"Password is required."],
        minLength:[6,"Should have atleast 6 characters"],
        validate: {
            validator: function (value) {
              // Regular expression to check if the password has at least one number and one special character
              return /^(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).+$/.test(value);
            },
            message: "Password should contain at least one number and one special character."
          }
    },

    confirmPassword:{
        type:String,
        required:true,
        minLength:6,
        validate:[function(){
            return this.password==this.confirmPassword
        },"password should be equal to confirm password"]
    },

    createdAt:{
        type: Date,
        default:Date.now()
    },

    isPremium:{
        type:Boolean,
        default: false
    },

    role:{
        type:String,
        // these are the only possible values for the role
        enum:["user","admin","feed-curator","moderator"],
        default:"user"
    },

    otp:{
        type:String
    },

    otpExpire:{
        type:Date
    }
}


const userSchema=new mongoose.Schema(schemaRules)


/********Hooks for MongoDB********/
userSchema.pre("save", function(next){
    console.log("pre hook was called")
    this.confirmPassword=undefined
    next()
})


userSchema.post("save", function(){
    console.log("post hook was called")
    this.__v=undefined
    this.password=undefined
})



//final touch point
const UserModel=mongoose.model("User", userSchema)
module.exports=UserModel