import { Router } from "express";
import { confirmOrder } from "../controllers/cartContrroller";
import { protect } from "../controllers/authController";
import { translationMiddleware } from "../utils/translation";
const router: Router = Router();
router.use(translationMiddleware)
router.post("/", protect, confirmOrder);

export default router;
