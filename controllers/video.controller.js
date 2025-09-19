import Video from "../models/Videos.js";

// 1️⃣ Create a Video
const createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    const savedVideo = await video.save();

    res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: savedVideo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 2️⃣ Get All Videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      success: true,
      message: "All videos fetched successfully",
      data: videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3️⃣ Get Single Video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video fetched successfully",
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 4️⃣ Update Video by ID
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: updatedVideo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 5️⃣ Delete Video by ID
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: deletedVideo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo };
