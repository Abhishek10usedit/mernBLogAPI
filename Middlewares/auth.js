import jwt from "jsonwebtoken"
import { User } from "../Models/user.js"


export const isAuthenticated= async (request,response,next)=>{
    const {token} =request.cookies
    if(!token){
        response.status(400).json({
            sucess:false,
            message:"login first"
        })
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    if(!decode){
        response.status(400).json({
            sucess:false,
            message:"login first"
        })
    }
    request.user = await User.findById(decode)
    next()
}