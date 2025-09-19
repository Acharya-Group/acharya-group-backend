import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import genreateToken from "../utils/genreateToken.js";

async function registerAdmin(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ message: "Only one admin can register" });
    }

    const newAdmin = await Admin.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      newAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Email not exists" });
    }

    const isPassword = await bcrypt.compare(password, admin.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Password not match" });
    }

    const token = genreateToken(admin._id);

    return res.status(200).json({
      message: "Admin login successfully",
      admin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// 1️⃣ Verify Current Password
async function verifyPassword(req, res) {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);

    res.status(200).json({
      success: true,
      message: isMatch ? "Password is correct" : "Password is incorrect",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// 2️⃣ Update Password
async function updatePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both current and new passwords are required" });
    }

    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Current password is incorrect" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);

    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { registerAdmin,verifyPassword, loginAdmin,updatePassword };