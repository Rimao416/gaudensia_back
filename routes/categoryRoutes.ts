import { Router } from "express";
import {
  addCategories,
  getCategories,
} from "../controllers/categoryController";
import { translationMiddleware } from "../utils/translation";
const router: Router = Router();
router.use(translationMiddleware);
router.route("/").post(addCategories).get(getCategories);


export default router;
