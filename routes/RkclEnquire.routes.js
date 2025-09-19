import express from "express"
import { createEnquiry, deleteEnquiry, getAllEnquiries, updateRkclEnquire } from "../controllers/rkclEnquire.controller.js";
const RkclEnquireRoutes = express.Router();


RkclEnquireRoutes.post("/",createEnquiry)
RkclEnquireRoutes.put("/:id",updateRkclEnquire)
RkclEnquireRoutes.get("/",getAllEnquiries)
RkclEnquireRoutes.delete("/:id",deleteEnquiry)

export default RkclEnquireRoutes;