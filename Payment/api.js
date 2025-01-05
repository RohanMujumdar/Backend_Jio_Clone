const express=require("express")
const app=express()
const dotenv=require("dotenv")
const Razorpay=require("razorpay")
const ShortId=require("short-unique-id")
const cors=require("cors")
dotenv.config(dotenv.config({ path: "../.env" }));


const {RAZORPAY_PUBLIC_KEY, RAZORPAY_PRIVATE_KEY}=process.env
const uid=new ShortId({length:10})

// Our instance is getting created with the help of our private key and public key
const razorpayInstance=new Razorpay({
    key_id:RAZORPAY_PUBLIC_KEY,
    key_secret:RAZORPAY_PRIVATE_KEY
})

app.get("/",(req, res)=>{
    console.log("get route is working")
})


// You are allowing any users to access your server as cross origin
app.use(cors())
app.use(express.json())

app.post("/checkout", async (req, res)=>{

    try{
        const amount=100
        const currency="INR"
        const receipt=`rp_${uid.rnd()}`
    
        const orderConfig={
            amount:amount*100,
            currency:currency,
            receipt:receipt
        }
    
        // This command tells razorpay that backend is about to make this particular payment.
        const order=await razorpayInstance.orders.create(orderConfig)
        console.log("Orders", order)
        res.status(201).json({
            status:"success",
            order: order
        })
    }
    catch(err)
    {
        res.status(500).json({
            status:"failure",
            message:"Internal Server Error"
        })
    }
    
})

app.post("/verify", function(){
    // in this function, razorpay has to confirm that payment is done and 
    // update the status of the user.
})


const PORT=process.env.PORT||3000;
app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
