import express from 'express'
import { createVideo, deleteVideo, getAllVideos, getVideoById, updateVideo } from '../controllers/video.controller.js';
const VideoRoute= express.Router();

VideoRoute.post("/",createVideo)
VideoRoute.put("/:id",updateVideo)
VideoRoute.get("/",getAllVideos)
VideoRoute.get("/:id",getVideoById)
VideoRoute.delete("/:id",deleteVideo)

export default VideoRoute;