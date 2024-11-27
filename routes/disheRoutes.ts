import { Router } from "express";
import {
  addDishe,
  getAllDishes,
  getMenuByCategories,
  searchByCategories,
  singleDishes,
} from "../controllers/disheController";
import { translationMiddleware } from "../utils/translation";
// import { translationMiddleware } from "../utils/translation";
const router: Router = Router();
router.use(translationMiddleware)
router.route("/").get(getAllDishes).post(addDishe);
router.route("/getMenuCategories").get(getMenuByCategories);
router.get("/:id", singleDishes);
router.route("/getByCategories/:id").get(searchByCategories);

export default router;
