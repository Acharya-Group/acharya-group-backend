import mongoose from "mongoose";

const stationerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rateOnLessQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    quantityThreshold: {
        type: Number,
        required: true,
        min: 1
    },
    rateOnGreaterQuantity: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const StationeryRate = mongoose.model('Stationery', stationerySchema);

export default StationeryRate;