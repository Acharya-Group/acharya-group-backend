import RkclEnquire from "../models/RkclEnquire.js";

// 1️⃣ Create new enquiry
const createEnquiry = async (req, res) => {
  try {
    const enquiry = new RkclEnquire(req.body);
    const savedEnquiry = await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: savedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateRkclEnquire = async (req, res) => {
  try {
    const { id } = req.params;

    const updateRkclEnquire = await RkclEnquire.findByIdAndUpdate(
      id,
      req.body, 
      {
        new: true,          
        runValidators: true
      }
    );

    if (!updateRkclEnquire) {
      return res.status(404).json({
        success: false,
        message: "Rkcl Enquire not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rkcl Enquire updated successfully",
      data: updateRkclEnquire,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2️⃣ Get all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await RkclEnquire.find();
    res.status(200).json({
      success: true,
      message: "All enquiries fetched successfully",
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3️⃣ Delete an enquiry by ID
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEnquiry = await RkclEnquire.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: deletedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export { createEnquiry, getAllEnquiries, deleteEnquiry,updateRkclEnquire };
