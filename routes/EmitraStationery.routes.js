import express from 'express'
import { allOrders, createOrder, deleteOrder, getSingleOrder, updateOrder } from '../controllers/emitraStationery.controller.js';
const OrderRoutes= express.Router();

OrderRoutes.post("/",createOrder)
OrderRoutes.put("/:id",updateOrder)
OrderRoutes.get("/",allOrders)
OrderRoutes.get("/:id",getSingleOrder)
OrderRoutes.delete("/:id",deleteOrder)

export default OrderRoutes;