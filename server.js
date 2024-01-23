

import express from "express"
import mongoose from "mongoose"

import userRouter from "./routes/user.js"
import blogRouter from "./routes/blogs.js"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import cors from "cors"


const app=express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method: ["GET","POST","PUT","DELETE"],
    credentials:true
}))


config({
    path:"./Data/config.env"
})



// router including
app.use("/api/users",userRouter)
app.use("/api/blogs",blogRouter)


mongoose.connect(process.env.MONGO_URL,{
    dbName:"BlogWebsite"
})
.then(()=>console.log("dataBase connected"))
.catch((e)=>console.log(`the error is ${e}`))



app.listen(process.env.PORT,()=>console.log(`Server's Running on port ${process.env.PORT}`))

