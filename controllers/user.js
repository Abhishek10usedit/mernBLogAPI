import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {User} from "../Models/user.js"
import { generateCookie } from "../utils/features.js"



export const userRegister= async(request,response)=>{

    const {name,email,password} = request.body

    // if user already exist
    let user = await User.findOne({email})
    if(user){
        return response.status(400).json({
            sucess:false,
            message:"user already exist"
        })
    }

    //  if new user appears
    const hashPassword = await bcrypt.hash(password,10)
    user=await User.create({
        name,
        email,
        password:hashPassword
    })


    generateCookie(user,response,201,"user created and cookie generated")
}


export const userLogin = async (request,response)=>{

    const{email,password} = request.body

    let user = await User.findOne({email})
    if(!user){
        return response.status(404).json({
            sucess:false,
            message:`${name} user does not exist`
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return response.status(400).json({
            sucess:false,
            message:`email or password is wrong retry please`
        })
    }

    generateCookie(user,response,201,`Welcome back ${user.name}`)
}


export const userLogout=async (request,response)=>{

    

    response.status(200)
    .cookie("token","",{
       httpOnly:true,
       secure:true,
       expires:new Date(Date.now())
    })
    .json({
        sucess:true,
        message:`logout sucessfull`,
    })
}





export const userGetMyProfile=async (request,response) =>{
    response.status(200).json({
        sucess:true,
        user:request.user
    })
}


export const getUserById = async(request,response) =>{


    const id=request.params.id
    const user=await User.findById(id)
    if(!user) return response.staus(400).json({
            sucess:false,
            message:"user doesn't exist"
        })
    
    response.status(200).json({
        sucess:true,
        message:"user is ...",
        user
    })
}

