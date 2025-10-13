import crypto from "crypto";
import Order from "../models/EmitraStationery.js";

const { PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT, PAYU_BASE_URL, FRONTEND_URL } = process.env;

// ✅ Step 1: Initiate Payment
export const initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Missing orderId" });
    }

    // Fetch order from DB
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const { name, phoneNo, totalAmount } = order;
    const email = order.email || "default@example.com";

    const txnid = "TXN" + Date.now();

    // Generate hash
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${totalAmount}|Stationery Order|${name}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // Return payment data
   res.json({
  success: true,
  paymentUrl: `${PAYU_BASE_URL}/_payment`,
  payload: {
    key: PAYU_MERCHANT_KEY,
    txnid,
    amount: totalAmount || 0,
    productinfo: "Stationery Order",
    firstname: name || "",
    email: email || "default@example.com",
    phone: phoneNo || "",
    surl: `${FRONTEND_URL}/payment-success`,
    furl: `${FRONTEND_URL}/payment-failed`,
    hash: hash || "",
    orderId,
  },
});

  } catch (err) {
    console.error("Initiate Payment Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Step 2: PayU Payment Callback
export const payuCallback = async (req, res) => {
  try {
    const { status, txnid, amount, hash, mihpayid, email, productinfo, firstname, orderId } = req.body;

    // Optional: verify hash if needed
    const hashString = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
    const calculatedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    if (hash !== calculatedHash) {
      return res.status(400).json({ success: false, message: "Invalid hash" });
    }

    // ✅ Update only transactionId and paymentStatus
    const paymentStatus = status === "success" ? "success" : "failed";

    await Order.findByIdAndUpdate(orderId, {
      transactionId: mihpayid,
      paymentStatus,
    });

    // Redirect to frontend with only the needed info
    res.redirect(`${FRONTEND_URL}/payment-status?status=${paymentStatus}&txnid=${txnid}`);
  } catch (err) {
    console.error("PayU Callback Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
