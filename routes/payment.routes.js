import express from "express";
import { initiatePayment, payuCallback } from "../controllers/payment.controller.js";

const PaymentRoute = express.Router();

PaymentRoute.post("/initiate", initiatePayment);
PaymentRoute.post("/verify/:txnid", payuCallback);

export default PaymentRoute;
