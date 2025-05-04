import { Router } from "express";
import { generateLink, shareLink } from "../controllers/shareController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/share", authenticateToken, generateLink);
router.get("/share/:shareLink", shareLink);

export default router;
