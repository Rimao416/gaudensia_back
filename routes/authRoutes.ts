import { Router } from "express";
import { login, refreshToken, signup } from "../controllers/authController";
const router: Router = Router();
router.post("/sign", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;
