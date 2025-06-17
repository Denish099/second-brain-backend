import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/authController";

const router = Router(); // ✅ should be Router, not Application

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", getCurrentUser);

export default router;
