
import jwt from "jsonwebtoken";


export const generateCookie = (user,response,statusCode,message) =>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
    
    response.status(statusCode)
            .cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "Development" ? false : true,
                maxAge:10*60*1000,
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none"
            })
            .json({
                sucess:true,
                message:message,
                user
            })
}