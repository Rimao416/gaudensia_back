import { Router } from "express";
import {
  // addDishe,
  addDishWithTranslations,
  getAllDishes,
  getMenuByCategories,
  searchTranslations,
  singleDishes,
  validateSearchRequest,
} from "../controllers/disheController";
import { translationMiddleware } from "../utils/translation";
const router: Router = Router();
router.use(translationMiddleware);
router.route("/").get(getAllDishes).post(addDishWithTranslations);
router.get("/translations",validateSearchRequest, searchTranslations)
router.route("/getMenuCategories").get(getMenuByCategories);
router.get("/:id", singleDishes);

export default router;
