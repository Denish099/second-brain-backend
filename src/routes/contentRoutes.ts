import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { addContent } from "../controllers/contentController";
const router = Router();

router.post("/", authenticateToken, addContent);
router.get("/", () => {});
router.delete("/", () => {});
export default router;
