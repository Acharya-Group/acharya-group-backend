import express from 'express';
import multer from 'multer';
import { addTestimonial, deleteTestimonial, getSingleTestimonial, getTestimonials, updateTestimonial } from '../controllers/testimonial.controller.js';

const TestimonialRoute = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

TestimonialRoute.post("/", upload.single("Image"), addTestimonial);
TestimonialRoute.put("/:id", upload.single("Image"), updateTestimonial);
TestimonialRoute.get("/", getTestimonials);
TestimonialRoute.get("/:id", getSingleTestimonial);
TestimonialRoute.delete("/:id", deleteTestimonial);

export default TestimonialRoute;
