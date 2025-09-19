import express from 'express'
import { createReference, deleteReference, getAllReferences, getReferenceById, updateReference } from '../controllers/validateReference.controller.js';
const ValidateReferenceRoute= express.Router();

ValidateReferenceRoute.post("/",createReference)
ValidateReferenceRoute.put("/:id",updateReference)
ValidateReferenceRoute.get("/",getAllReferences)
ValidateReferenceRoute.get("/:id",getReferenceById)
ValidateReferenceRoute.delete("/:id",deleteReference)

export default ValidateReferenceRoute;