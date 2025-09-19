import Seo from "../models/Seo.js";

// 1️⃣ Create or update SEO (singleton)
const createOrUpdateSeo = async (req, res) => {
  try {
    // Check if a SEO document already exists
    let seo = await Seo.findOne();

    if (seo) {
      // Update existing SEO
      seo.title = req.body.title || seo.title;
      seo.description = req.body.description || seo.description;
      seo.keywords = req.body.keywords || seo.keywords;

      const updatedSeo = await seo.save();
      return res.status(200).json({
        success: true,
        message: "SEO updated successfully",
        data: updatedSeo,
      });
    } else {
      // Create new SEO
      seo = new Seo(req.body);
      const savedSeo = await seo.save();
      return res.status(201).json({
        success: true,
        message: "SEO created successfully",
        data: savedSeo,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 2️⃣ Get SEO (to show in form)
const getSeo = async (req, res) => {
  try {
    const seo = await Seo.findOne();
    if (!seo)
      return res.status(404).json({ success: false, message: "SEO not found" });

    res.status(200).json({
      success: true,
      data: seo,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export { createOrUpdateSeo, getSeo };
