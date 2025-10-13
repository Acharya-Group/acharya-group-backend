import express from 'express'
import adminRoutes from './Admin.routes.js';
import DcRoutes from './Dc.routes.js';
import OrderRoutes from './EmitraStationery.routes.js';
import FeedbackAndComplainRoutes from './FeedbackAndComplaint.routes.js';
import GalleryRoutes from './Gallery.routes.js';
import PopupRoutes from './Popup.routes.js';
import RkclEnquireRoutes from './RkclEnquire.routes.js';
import SeoRoutes from './Seo.router.js';
import SliderRoutes from './Slider.routes.js';
import ValidateReferenceRoute from './ValidateReference.router.js';
import VideoRoute from './Video.router.js';
import TestimonialRoute from './Testimonial.routes.js';
import BlogRoute from './Blog.routes.js';
import StationeryRateRoute from './StationeryRate.routes.js';
import ContactRoute from './Contact.routes.js';
import PaymentRoute from './payment.routes.js';
const routes = express.Router();

routes.use("/Admin",adminRoutes)
routes.use("/Contact",ContactRoute,)
routes.use("/Dc",DcRoutes,)
routes.use("/Order",OrderRoutes,)
routes.use("/FeedbackAndComplain",FeedbackAndComplainRoutes,)
routes.use("/gallery",GalleryRoutes,)
routes.use("/Popup",PopupRoutes,)
routes.use("/RkclEnquire",RkclEnquireRoutes,)
routes.use("/Seo",SeoRoutes,)
routes.use("/Slider",SliderRoutes)
routes.use("/Reference",ValidateReferenceRoute)
routes.use("/Video",VideoRoute)
routes.use("/Testimonial",TestimonialRoute)
routes.use("/blogs",BlogRoute)
routes.use("/StationeryRate",StationeryRateRoute)
routes.use("/Payment", PaymentRoute);

export default routes;