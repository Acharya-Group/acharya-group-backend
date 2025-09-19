import express from "express";
import multer from "multer";
import {
  addImage,
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
router.post("/", upload.array("images", 10), addImage); 
router.put("/:categoryId/image/:imageId", upload.single("image"), updateImage);
router.get("/", getGalleries);
router.get("/:categoryId", getSingleGallery);
router.delete("/:categoryId/image/:imageId", deleteImage);
router.delete("/:categoryId", deleteGallery);

export default router;
