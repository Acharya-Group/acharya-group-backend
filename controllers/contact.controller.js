import ContactData from "../models/ContactData.js";

// Create Contact Form Data
const ContactformCreate = async (req, res) => {
  try {
    const contact = new ContactData(req.body);
    const saveContactData = await contact.save();
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: saveContactData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateContactFormData = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContactFormData = await ContactData.findByIdAndUpdate(
      id,
      req.body, 
      {
        new: true,          
        runValidators: true
      }
    );

    if (!updatedContactFormData) {
      return res.status(404).json({
        success: false,
        message: "Contact Data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact data updated successfully",
      data: updatedContactFormData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Contact Form Data
const getAllContactFormData = async (req, res) => {
  try {
    const formDatas = await ContactData.find();
    res.status(200).json({
      success: true,
      message: "Form data fetched successfully",
      data: formDatas,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Contact Form Data by ID
const deleteContactFormData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await ContactData.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Contact form data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact form data deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  ContactformCreate,
  getAllContactFormData,
  deleteContactFormData,
  updateContactFormData,
};
