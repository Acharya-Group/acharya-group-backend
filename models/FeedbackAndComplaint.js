import mongoose from "mongoose";

const feedbackComplaintSchema = new mongoose.Schema(
  {
    name: { type: String },
    number: { type: String },
    district: { type: String },
    state: { type: String },
    formType: { type: String },
    subject: { type: String },  
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "resolved"], 
      default: "pending",            
    },
  },
  { timestamps: true }
);

const FeedbackAndComplain = mongoose.model(
  "FeedbackAndComplain",
  feedbackComplaintSchema
);

export default FeedbackAndComplain;
