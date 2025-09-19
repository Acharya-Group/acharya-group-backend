import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    image:{type:String,required:true},
    link:{type:String,required:true}
},{ timestamps: true })

const Slider = mongoose.model('Slider',sliderSchema)

export default Slider