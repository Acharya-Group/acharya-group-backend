import express from 'express'
import { allDc, createDc, deleteDc, getSingleDc, updateDc } from '../controllers/dc.controller.js';
const DcRoutes= express.Router();

DcRoutes.post("/",createDc)
DcRoutes.put("/:id",updateDc)
DcRoutes.get("/",allDc)
DcRoutes.get("/:id",getSingleDc)
DcRoutes.delete("/:id",deleteDc)

export default DcRoutes;