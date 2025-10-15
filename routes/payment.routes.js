import express from "express";
import { initiatePayment, payuCallback, payuSuccess, payuFailed } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/verify/:txnid", payuCallback);
router.post("/payment-success", payuSuccess);
router.post("/payment-failed", payuFailed);

export default router;
