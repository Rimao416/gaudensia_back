import { Router } from "express";
import { getUserInfo } from "../controllers/userContrroller";
import { protect, updateProfile } from "../controllers/authController";
const router: Router = Router();
router.get("/", protect, getUserInfo);
router.put("/updateProfile", protect, updateProfile);

export default router;
