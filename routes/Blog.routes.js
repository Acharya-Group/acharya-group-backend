import express from 'express';
import multer from 'multer';
import { addBlog, updateBlog, getBlogs, getSingleBlog, deleteBlog } from '../controllers/blog.controller.js';

const BlogRoute = express.Router();

// Multer config (using diskStorage for temp uploads before Cloudinary)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
BlogRoute.post("/", upload.single("image"), addBlog);       
BlogRoute.put("/:id", upload.single("image"), updateBlog);   
BlogRoute.get("/", getBlogs);                                
BlogRoute.get("/:id", getSingleBlog);                       
BlogRoute.delete("/:id", deleteBlog);                       

export default BlogRoute;
