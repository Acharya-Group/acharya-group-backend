import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 1️⃣ Add Single or Multiple Images to a Category
const addImage = async (req, res) => {
  try {
    const { category } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Image(s) are required" });
    }

    let gallery = await Gallery.findOne({ category });
    const uploadedImages = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, { folder: "achariya-gallery" });
      fs.unlinkSync(file.path);
      uploadedImages.push({ url: result.secure_url, publicId: result.public_id });
    }

    if (gallery) {
      gallery.images.push(...uploadedImages);
    } else {
      gallery = new Gallery({ category, images: uploadedImages });
    }

    const savedGallery = await gallery.save();
    res.status(201).json({ success: true, message: "Image(s) added successfully", data: savedGallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Get All Categories
const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json({ success: true, message: "All categories fetched", data: galleries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ Get Single Category
const getSingleGallery = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery not found" });

    res.status(200).json({ success: true, message: "Gallery fetched successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4️⃣ Update a Specific Image (by `_id` or `publicId`)
const updateImage = async (req, res) => {
  try {
    const { categoryId, imageId } = req.params;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    // Find image by _id
    const image = gallery.images.id(imageId) || gallery.images.find(img => img.publicId === imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "achariya-gallery" });
    fs.unlinkSync(req.file.path);

    // Update image
    image.url = result.secure_url;
    image.publicId = result.public_id;

    await gallery.save();
    res.status(200).json({ success: true, message: "Image updated successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5️⃣ Delete a Specific Image
const deleteImage = async (req, res) => {
  try {
    const { categoryId, imageId } = req.params;
    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    const image = gallery.images.id(imageId) || gallery.images.find(img => img.publicId === imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    image.deleteOne();

    await gallery.save();
    res.status(200).json({ success: true, message: "Image deleted successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6️⃣ Delete Entire Category
const deleteGallery = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const gallery = await Gallery.findById(categoryId);
    if (!gallery) return res.status(404).json({ error: "Category not found" });

    for (const img of gallery.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    await Gallery.findByIdAndDelete(categoryId);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addImage, getGalleries, getSingleGallery, updateImage, deleteImage, deleteGallery };
