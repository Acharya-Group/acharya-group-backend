import mongoose from "mongoose";

const stationeryItemSchema = new mongoose.Schema({
  type: { type: String },
  quantity: { type: Number, required: true, min: 1 }
});

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
      default: "pending"
    },
    items: [stationeryItemSchema]
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
