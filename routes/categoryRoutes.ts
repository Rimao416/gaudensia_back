import { Router } from "express";
import {
  addCategories,
  getCategories,
} from "../controllers/categoryController";
const router: Router = Router();

router.route("/").post(addCategories).get(getCategories);


export default router;
