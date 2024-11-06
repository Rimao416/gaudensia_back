import { Router } from "express";
import { login, signup } from "../controllers/authController";
const router: Router = Router();
router.post("/sign", signup);
router.post("/login", login);

export default router;
