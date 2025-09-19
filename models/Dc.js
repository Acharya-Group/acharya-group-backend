import mongoose from "mongoose";

const dcSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    number:{type:Number},
    district:{type:String},
    state:{type:String},
    address:{type:String},
},{ timestamps: true })

const Dc = mongoose.model('Dc',dcSchema)
export default Dc;