import mongoose from "mongoose";

const referenceSchema = new mongoose.Schema({
  referenceNo: { type: String, required: true,unique: true },
  date: { type: String, required: true },
  issuedTo: { type: String, required: true },
  issuedBy: { type: String, required: true },
  subject: { type: String, required: true }
},{ timestamps: true });

const ValidateReference = mongoose.model("ValidateReference", referenceSchema);

export default ValidateReference;
