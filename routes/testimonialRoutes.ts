import { Router } from "express";
import { getAllTestimonials } from "../controllers/testimonialController";
const router: Router = Router();
router.route("/").get(getAllTestimonials);

export default router;
