import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

const gallerySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, lowercase: true, unique: true },
    images: { type: [imageSchema], default: [] }, 
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
