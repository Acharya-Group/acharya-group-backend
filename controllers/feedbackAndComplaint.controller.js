import FeedbackAndComplain from "../models/FeedbackAndComplaint.js";

// ✅ Create Feedback/Complaint
const createFeedback = async (req, res) => {
  try {
    const feedback = new FeedbackAndComplain(req.body);
    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback/Complaint created successfully",
      data: savedFeedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ Update Feedback/Complaint 
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFeedback = await FeedbackAndComplain.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true, 
        runValidators: true, 
      }
    );

    if (!updatedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback/Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback/Complaint updated successfully",
      data: updatedFeedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get All Feedbacks/Complaints
const allFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackAndComplain.find();
    res.status(200).json({
      success: true,
      message: "Feedbacks/Complaints fetched successfully",
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get Single Feedback/Complaint by ID
const getSingleFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await FeedbackAndComplain.findById(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback/Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback/Complaint fetched successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete Feedback/Complaint
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await FeedbackAndComplain.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback/Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback/Complaint deleted successfully",
      data: deletedFeedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  createFeedback,
  allFeedbacks,
  getSingleFeedback,
  deleteFeedback,
  updateFeedback,
};
