import { Router } from "express";
import {
  addDishe,
  getAllDishes,
  getMenuByCategories,
  searchByCategories,
  singleDishes,
} from "../controllers/disheController";
const router: Router = Router();

router.route("/").get(getAllDishes).post(addDishe);
router.route("/getMenuCategories").get(getMenuByCategories);
router.route("/:id").get(singleDishes);
router.route("/getByCategories/:id").get(searchByCategories);

export default router;
