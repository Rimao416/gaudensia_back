import {Router} from "express"
import { addTranslation } from "../controllers/translationController";
const router:Router = Router();
router.post("/", addTranslation)

export default router;