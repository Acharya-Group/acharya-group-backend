import express from 'express'
import { createStationery, deleteStationery, getAllStationeries, getSingleStationery, updateStationery } from '../controllers/stationeryRate.controller.js';
const StationeryRateRoute= express.Router();

StationeryRateRoute.post("/",createStationery)
StationeryRateRoute.put("/:id",updateStationery)
StationeryRateRoute.get("/",getAllStationeries)
StationeryRateRoute.get("/:id",getSingleStationery)
StationeryRateRoute.delete("/:id",deleteStationery)

export default StationeryRateRoute;