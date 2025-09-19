import express from 'express'
import { allFeedbacks, createFeedback, deleteFeedback, getSingleFeedback, updateFeedback } from '../controllers/feedbackAndComplaint.controller.js';
const FeedbackAndComplainRoutes= express.Router();

FeedbackAndComplainRoutes.post("/",createFeedback)
FeedbackAndComplainRoutes.put("/:id",updateFeedback)
FeedbackAndComplainRoutes.get("/",allFeedbacks)
FeedbackAndComplainRoutes.get("/:id",getSingleFeedback)
FeedbackAndComplainRoutes.delete("/:id",deleteFeedback)

export default FeedbackAndComplainRoutes;