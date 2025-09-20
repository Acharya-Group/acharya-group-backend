import StationeryRate from "../models/StationeryRate.js";

// ✅ Create Stationery
const createStationery = async (req, res) => {
  try {
    const stationery = new StationeryRate(req.body);
    const savedStationery = await stationery.save();
    res.status(201).json({
      success: true,
      message: "Stationery created successfully",
      data: savedStationery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ Get All Stationeries
const getAllStationeries = async (req, res) => {
  try {
    const allStationeries = await StationeryRate.find();
    res.status(200).json({
      success: true,
      message: "Stationery data fetched successfully",
      data: allStationeries,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get Single Stationery
const getSingleStationery = async (req, res) => {
  try {
    const { id } = req.params; 
    const stationery = await StationeryRate.findById(id);

    if (!stationery) {
      return res.status(404).json({
        success: false,
        message: "Stationery not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Stationery data fetched successfully",
      data: stationery,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Update Stationery by ID
const updateStationery = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStationery = await StationeryRate.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStationery) {
      return res.status(404).json({
        success: false,
        message: "Stationery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stationery updated successfully",
      data: updatedStationery,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete Stationery by ID
const deleteStationery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStationery = await StationeryRate.findByIdAndDelete(id);

    if (!deletedStationery) {
      return res.status(404).json({
        success: false,
        message: "Stationery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stationery deleted successfully",
      data: deletedStationery,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { 
  createStationery, 
  getAllStationeries, 
  getSingleStationery, 
  updateStationery, 
  deleteStationery 
};
