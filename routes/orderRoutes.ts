import { Router } from "express";
import { getOrder } from "../controllers/orderController";
import { translationMiddleware } from "../utils/translation";
import { protect } from "../controllers/authController";
const router: Router = Router();
router.use(translationMiddleware);
router.get("/me",protect, getOrder);

export default router;
