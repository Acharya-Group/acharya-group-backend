import mongoose from "mongoose";

// Individual stationery item schema
const stationeryItemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  rateOnLessQuantity: { type: Number },
  quantityThreshold: { type: Number },
  rateOnGreaterQuantity: { type: Number },
});

// Order schema
const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    kioskId: { type: String, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    transactionId: { type: String, default: null },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    amount: { type: Number, required: true }, 
    items: [stationeryItemSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
