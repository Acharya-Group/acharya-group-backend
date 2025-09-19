import ValidateReference from "../models/ValidateReference.js";

// 1️⃣ Create a Reference
// 1️⃣ Create a Reference
const createReference = async (req, res) => {
  try {
    const reference = new ValidateReference(req.body);
    const savedReference = await reference.save();

    res.status(201).json({
      success: true,
      message: "Reference created successfully",
      data: savedReference,
    });
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(400).json({
        success: false,
        message: "Reference number already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// 2️⃣ Get All References
const getAllReferences = async (req, res) => {
  try {
    const references = await ValidateReference.find();
    res.status(200).json({
      success: true,
      message: "All references fetched successfully",
      data: references,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3️⃣ Get Single Reference by ID
const getReferenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const reference = await ValidateReference.findById(id);

    if (!reference) {
      return res.status(404).json({
        success: false,
        message: "Reference not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reference fetched successfully",
      data: reference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 4️⃣ Update Reference by ID
const updateReference = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReference = await ValidateReference.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedReference) {
      return res.status(404).json({
        success: false,
        message: "Reference not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reference updated successfully",
      data: updatedReference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 5️⃣ Delete Reference by ID
const deleteReference = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReference = await ValidateReference.findByIdAndDelete(id);

    if (!deletedReference) {
      return res.status(404).json({
        success: false,
        message: "Reference not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reference deleted successfully",
      data: deletedReference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  createReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference,
};
