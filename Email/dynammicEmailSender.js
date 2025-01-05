const dotenv=require("dotenv")
dotenv.config()
const nodemailer=require("nodemailer")
const fs=require("fs")


async function updateTemplate(templatePath, toReplaceObject)
{
    let templateContent=await fs.promises.readFile(templatePath,"utf-8");
    const keyArrays=Object.keys(toReplaceObject)
    keyArrays.forEach((key)=>{
        templateContent=templateContent.replace(`#{${key}}`, toReplaceObject[key])
    })
    return templateContent
}

async function emailSender(templatePath, recieverEmail, toReplaceObject)
{
    try{
        
        // We use Sendgrid service via Nodemailer
        // Through which service we have to send the mail

        const content=await updateTemplate(templatePath, toReplaceObject)
        const sendGridDetails={
            host:"smtp.sendgrid.net",
            port:465,
            secure:true,
            auth:{
                user:"apikey",
                pass:process.env.SENDGRID_API_KEY
            }
        }

        const msg = {
            to: recieverEmail, // Change to your recipient
            from: 'rohanmujumdar2001@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: content,
        }

        const transporter=nodemailer.createTransport(sendGridDetails)
        await transporter.sendMail(msg)
        
    }catch(err)
    {
        console.log("Email Not Sent",err)
    }
}


// The below was only for a demo
// const toReplaceObject={
//     name: "Rohan",
//     otp:"1234"
// }
// emailSender("../templates/otp.html", "rohanmujumdar10@gmail.com", toReplaceObject).then(()=>{
//     console.log("Email Sent")
// })
 

module.exports=emailSender
