import {Blog} from "../Models/blogs.js"





export const createBlog = async(request,response)=>{
    const {title,description,imgUrl} = request.body
    let blog = await Blog.findOne({title})
    if(blog){
        return response.status(400).json({
            sucess:false,
            message:` blog with title ${title} already exist!`
        })
    }
    blog = await Blog.create({
        title,
        description,
        imgUrl,
        user:request.user
    }) 

    response.status(200).json({
        sucess:true,
        message:"blog created sucessfully",
        blog
    })
}
export const myBlog = async(request,response)=>{
    const userId= request.user._id

    const blogs = await Blog.find({user:userId}) 
    if(!blogs){
        return response.status(404).json({
            sucess:false,
            blog: "no blog found"
        })
    }
    response.status(200).json({
        sucess:true,
        blogs
    })
}
export const updateBlog = async(request,response)=>{

    const {title,description,imgUrl} =request.body

    const Id = request.params.id

    const blog = await Blog.findById(Id)
    if(!blog){
        return response.status(200).json({
            sucess:false,
            message:"invalid blog ID"
        })
    }
    blog.title=title,
    blog.description=description,
    blog.imgUrl=imgUrl
    await blog.save()
    response.status(200).json({
        sucess:true,
        message:"update sucessfull"
    })
}
export const deleteBlog = async(request,response)=>{

    const Id = request.params.id
    const blog = await Blog.findById(Id)

    if(!blog){
        return response.status(404).json({
            sucess:false,
            message:"blog not found"
        })
    }
    await Blog.deleteOne(blog)
    response.status(200).json({
        sucess:true,
        message:"blog deleted sucessfully"
    })
}

export const getAllBlogs = async (request,response)=>{

    const blogs= await Blog.find()
    if(!blogs){
        return response.status(400).json({
            sucess:false,
            message:"No blogs exist"
        })
    }
    response.status(200).json({
        sucess:true,
        message:"All Blogs",
        blogs
    })
}

export const getBlogById = async (request,response)=>{

    const id = request.params.id
    const blog= await Blog.findById(id)
    if(!blog) return response.status(400).json({
            sucess:false,
            message:" blog not found"
        })
    response.status(200).json({
        sucess:true,
        message:"blog is",
        blog
    })
}
