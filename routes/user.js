import express from "express";
import { userLogin, userLogout, userRegister, userGetMyProfile, getUserById } from "../controllers/user.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router()

router.get("/",function(request,response){
    response.send("hello")
})
router.get("/lol",function(request,response){
    response.send("lol Page")
})


router.post("/register",userRegister)

router.post("/login",userLogin)

router.get("/logout",userLogout)


router.get("/myprofile",isAuthenticated,userGetMyProfile)

router.get("/:id",getUserById)
export default router
