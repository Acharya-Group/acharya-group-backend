import Popup from "../models/Popup.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 1️⃣ Add a new popup
const addPopup = async (req, res) => {
    try {
        const { link } = req.body;
        if (!req.file) return res.status(400).json({ error: "Image is required" });
        if (!link) return res.status(400).json({ error: "Link is required" });

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "achariya-popup" });
        fs.unlinkSync(req.file.path);

        const popup = new Popup({
            image: result.secure_url,
            link
        });

        const savedPopup = await popup.save();
        res.status(201).json({ message: "Popup added successfully", popup: savedPopup });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Update an existing popup by ID
const updatePopup = async (req, res) => {
    try {
        const { id } = req.params;
        const { link } = req.body;

        const popup = await Popup.findById(id);
        if (!popup) return res.status(404).json({ error: "Popup not found" });

        // Update image if a new file is uploaded
        if (req.file) {
            const publicId = popup.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`achariya-popup/${publicId}`);

            const result = await cloudinary.uploader.upload(req.file.path, { folder: "achariya-popup" });
            fs.unlinkSync(req.file.path);

            popup.image = result.secure_url;
        }

        // Update link if provided
        if (link) popup.link = link;

        const savedPopup = await popup.save();
        res.status(200).json({ message: "Popup updated successfully", popup: savedPopup });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ Get all popups
const getPopups = async (req, res) => {
    try {
        const popups = await Popup.find();
        res.status(200).json({ message: "All popup images fetched successfully", popups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Delete a popup by ID
const deletePopup = async (req, res) => {
    try {
        const { id } = req.params;
        const popup = await Popup.findById(id);
        if (!popup) return res.status(404).json({ error: "Popup not found" });

        // Delete image from Cloudinary
        const publicId = popup.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`achariya-popup/${publicId}`);

        await Popup.findByIdAndDelete(id);
        res.status(200).json({ message: "Popup deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addPopup, updatePopup, getPopups, deletePopup };
