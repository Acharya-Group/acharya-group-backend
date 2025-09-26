import express from "express";
import multer from "multer";
import {
  createCategory,       // NEW
  addImagesToCategory,  // MODIFIED
  updateImage,
  getGalleries,
  getSingleGallery,
  deleteImage,
  deleteGallery
} from "../controllers/gallery.controller.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes

// 1️⃣ Create category without images
router.post("/create-category", createCategory);

// 2️⃣ Add images to an existing category
router.post("/add-images", upload.array("images", 20), addImagesToCategory);

// 3️⃣ Update a specific image
router.put("/:categoryId/image/:imageId", upload.single("image"), updateImage);

// 4️⃣ Get all categories
router.get("/", getGalleries);

// 5️⃣ Get single category
router.get("/:categoryId", getSingleGallery);

// 6️⃣ Delete a specific image
router.delete("/:categoryId/image/:imageId", deleteImage);

// 7️⃣ Delete entire category
router.delete("/:categoryId", deleteGallery);

export default router;
