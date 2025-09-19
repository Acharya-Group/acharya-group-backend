import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{type:String},
    number:{type:String},
    district:{type:String},
    state:{type:String},
    message:{type:String},
     status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"], 
      default: "pending"
    },
},{ timestamps: true })

const ContactData = mongoose.model("ContactData",contactSchema)

export default ContactData;