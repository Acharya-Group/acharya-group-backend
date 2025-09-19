import express from "express"
import { createOrUpdateSeo, getSeo } from "../controllers/seo.controller.js";
const SeoRoutes = express.Router();


SeoRoutes.post("/", createOrUpdateSeo);
SeoRoutes.get("/", getSeo);

export default SeoRoutes;