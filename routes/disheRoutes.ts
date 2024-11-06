import { Router } from "express";
import {
  addDishe,
  getAllDishes,
  getMenuByCategories,
 
} from "../controllers/disheController";
const router: Router = Router();

router.route("/").get(getAllDishes).post(addDishe);
router.route("/getMenuCategories").get(getMenuByCategories)

export default router;
