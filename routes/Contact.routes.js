import express from "express"
import { ContactformCreate, deleteContactFormData, getAllContactFormData, updateContactFormData } from "../controllers/contact.controller.js";
const ContactRoute = express.Router();


ContactRoute.post("/",ContactformCreate)
ContactRoute.put("/:id",updateContactFormData)
ContactRoute.get("/",getAllContactFormData)
ContactRoute.delete("/:id",deleteContactFormData)

export default ContactRoute;
