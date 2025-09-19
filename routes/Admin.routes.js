import express from "express";
const adminRoutes = express.Router();
import {
  registerAdmin,
  loginAdmin,
  updatePassword,
  verifyPassword,
} from "../controllers/admin.controller.js";

adminRoutes.post("/signup", registerAdmin);
adminRoutes.post("/login", loginAdmin);
adminRoutes.put("/update-password", updatePassword);
adminRoutes.post("/verify-password", verifyPassword);

export default adminRoutes;