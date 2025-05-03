import { Router } from "express";
import { shareLink } from "../controllers/shareController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/share", authenticateToken, shareLink);
router.get("/:shareLink", () => {});

export default router;
