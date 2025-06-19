import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router(); // ✅ should be Router, not Application

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
