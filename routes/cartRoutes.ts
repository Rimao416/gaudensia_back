import { Router } from "express";
import { confirmOrder } from "../controllers/cartContrroller";
import { protect } from "../controllers/authController";
const router: Router = Router();
router.post("/", protect, confirmOrder);

export default router;
