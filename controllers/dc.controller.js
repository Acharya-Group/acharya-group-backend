import Dc from "../models/Dc.js";

// ✅ Create DC
const createDc = async (req, res) => {
  try {
    const dc = new Dc(req.body);
    const saveDc = await dc.save();
    res.status(201).json({
      success: true,
      message: "DC created successfully",
      data: saveDc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ Get All DCs
const allDc = async (req, res) => {
  try {
    const allDcs = await Dc.find();
    res.status(200).json({
      success: true,
      message: "DC data fetched successfully",
      data: allDcs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// ✅ Get Single DC
const getSingleDc = async (req, res) => {
  try {
    const { id } = req.params; 
    const dc = await Dc.findById(id);

    if (!dc) {
      return res.status(404).json({
        success: false,
        message: "DC not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "DC data fetched successfully",
      data: dc,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// ✅ Update DC by ID
const updateDc = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDc = await Dc.findByIdAndUpdate(id, req.body, {
      new: true, //============================== return updated document
      runValidators: true,
    });

    if (!updatedDc) {
      return res.status(404).json({
        success: false,
        message: "DC not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "DC updated successfully",
      data: updatedDc,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete DC by ID
const deleteDc = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDc = await Dc.findByIdAndDelete(id);

    if (!deletedDc) {
      return res.status(404).json({
        success: false,
        message: "DC not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "DC deleted successfully",
      data: deletedDc,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { createDc, allDc,getSingleDc, updateDc, deleteDc };
