import mongoose from "mongoose";

const rkclEnquireSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    number:{type:String},
    district:{type:String},
    tehsil:{type:String},
    city:{type:String},
    pinCode:{type:String},
    course:{type:String},
      status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"], 
      default: "pending"
    },
},{ timestamps: true })

const RkclEnquire = mongoose.model('RkclEnquire',rkclEnquireSchema)

export default RkclEnquire