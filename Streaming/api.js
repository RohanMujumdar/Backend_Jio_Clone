const express=require("express")
const app=express()
const fs=require("fs")
const cors=require("cors")
app.use(cors())

app.get("/memoryIntensive", function(req, res){
    console.log("reading the file content")
    const fileContent=fs.readFileSync("lcwd_jpa.zip")
    console.log("Content read finish")

    // These headers tell the browser to actually download the zip file.
    res.setHeader("Content-Disposition", "attachment; filename=lcwd_jpa.zip");
    res.setHeader("Content-Type", "application/zip");

    res.send(fileContent)
})

app.get("/streamFile", function(req, res){
    console.log("file readStream created")

    // Reading the file chunk by chunk.
    // const fileStreamInstance=fs.createReadStream("lcwd_jpa.zip")

    const videoStreamFile=fs.createReadStream("1.mp4")

    // Connecting the readFile by writeFile 
    res.writeHead(200,{
        "Content-Type":"video/mp4"
    })
    videoStreamFile.pipe(res)

})

app.get("/rangeStreaming", function(req, res){

    //  Video Player only defines us the range
    const range=req.headers.range
    if(range)
    {
        const stat=fs.statSync("1.mp4")
        const fileSize=stat.size
        
        const parts=range.replace(/bytes=/,"").split("-")
        const start=parseInt(parts[0],10) 
        const end=parts[1] ? parseInt(parts[1],10) : fileSize-1
        // const chunkSize=end-start+1
        const chunkSize=10**6

        const header={
            "Content-Type": "video/mp4",
            "Content-Length": chunkSize,
            "Accept-Range": "bytes",
            "Content-range": `bytes ${start}-${end}/${fileSize}`,
        }

        res.writeHead(206, header)

        // 206, Server only sends a part of the response as the specified in the range, used for streaming purposes as we only sends chunks in that.
        const file=fs.createReadStream("1.mp4", {start, end})
        file.pipe(res)
    }
    else{
        res.status(400).json({
            message: "Invalid request"
        })
    }
})

app.listen(3000, function(){
    console.log("server is running on 3000")
})

