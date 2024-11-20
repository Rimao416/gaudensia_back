import { Router } from "express";
import { getUserInfo } from "../controllers/userContrroller";
import { protect } from "../controllers/authController";
const router: Router = Router();
router.get("/",protect, getUserInfo);

export default router;
