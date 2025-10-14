import crypto from "crypto";
import Order from "../models/EmitraStationery.js";

const {
  PAYU_MERCHANT_KEY,
  PAYU_MERCHANT_SALT,
  PAYU_BASE_URL,
  NEXT_PUBLIC_FRONTEND_URL,
} = process.env;

const FRONTEND_URL = NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

// ✅ Initiate Payment
export const initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId)
      return res.status(400).json({ success: false, message: "Missing orderId" });

    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    const { name, phoneNo, amount } = order;
    const email = order.email || "default@example.com";
    const txnid = "TXN" + Date.now();
    const productinfo = "Stationery Order";

    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${name}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    return res.status(200).json({
      success: true,
      data: {
        action: `${PAYU_BASE_URL}/_payment`,
        key: PAYU_MERCHANT_KEY,
        txnid,
        amount,
        productinfo,
        firstname: name,
        email,
        phone: phoneNo,
        surl: `${FRONTEND_URL}/payment-success?orderId=${orderId}&txnid=${txnid}`,
        furl: `${FRONTEND_URL}/payment-failed?orderId=${orderId}&txnid=${txnid}`,
        hash,
        orderId,
      },
    });
  } catch (error) {
    console.error("Initiate Payment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ PayU Callback
export const payuCallback = async (req, res) => {
  try {
    const {
      status,
      txnid,
      amount,
      hash,
      mihpayid,
      email,
      productinfo,
      firstname,
      orderId,
    } = req.body;

    if (!orderId) return res.status(400).send("Order ID missing");

    const hashString = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
    const calculatedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    if (hash !== calculatedHash) return res.status(400).send("Invalid hash");

    const paymentStatus = status === "success" ? "success" : "failed";

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { transactionId: mihpayid || txnid, paymentStatus },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).send("Order not found");

    // Always include txnid in redirect
    return res.redirect(
      paymentStatus === "success"
        ? `${FRONTEND_URL}/payment-success?orderId=${orderId}&txnid=${mihpayid || txnid}`
        : `${FRONTEND_URL}/payment-failed?orderId=${orderId}&txnid=${mihpayid || txnid}`
    );
  } catch (err) {
    console.error("PayU Callback Error:", err);
    return res.status(500).send(err.message);
  }
};
