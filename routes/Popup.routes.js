import express from 'express';
import multer from 'multer';
import { addPopup, deletePopup, getPopups, updatePopup } from '../controllers/popup.controller.js';

const PopupRoutes = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });
PopupRoutes.post("/", upload.single("image"), addPopup);
PopupRoutes.put("/:id", upload.single("image"), updatePopup);
PopupRoutes.get("/", getPopups);
PopupRoutes.delete("/:id", deletePopup);

export default PopupRoutes;
