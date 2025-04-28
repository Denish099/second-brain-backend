import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { addContent, getContent } from "../controllers/contentController";
const router = Router();

router.post("/", authenticateToken, addContent);
router.get("/", authenticateToken, getContent);
router.delete("/", () => {});
export default router;
