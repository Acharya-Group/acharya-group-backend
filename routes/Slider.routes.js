import express from 'express';
import multer from 'multer';
import { addSlider, deleteSlider, getSliders, updateSlider } from '../controllers/slider.controller.js';

const SliderRoutes = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });
SliderRoutes.post("/", upload.single("image"), addSlider);
SliderRoutes.put("/:id", upload.single("image"), updateSlider);
SliderRoutes.get("/", getSliders);
SliderRoutes.delete("/:id", deleteSlider);

export default SliderRoutes;
