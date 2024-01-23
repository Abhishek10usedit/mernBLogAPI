import express from "express"
import { isAuthenticated } from "../Middlewares/auth.js"
import { createBlog, deleteBlog, getAllBlogs, getBlogById, myBlog, updateBlog } from "../controllers/blogs.js"

const router= express.Router()



router.get("/",(request,response)=>{
    response.send("morning")
})

router.post("/new",isAuthenticated,createBlog)
router.get("/myblogs",isAuthenticated,myBlog)
router.put("/:id",isAuthenticated,updateBlog)
router.delete("/:id",isAuthenticated,deleteBlog)

router.get("/allblogs",getAllBlogs)
router.get("/blog/:id",isAuthenticated,getBlogById)
export default router