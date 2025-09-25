import mongoose from "mongoose";

const dcSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true }, 
    district:{type:String},
    state:{type:String},
    address:{type:String},
},{ timestamps: true })

const Dc = mongoose.model('Dc',dcSchema)
export default Dc;
