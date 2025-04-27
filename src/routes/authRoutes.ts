import { Router } from "express";
import { signup, login } from "../controllers/authController";

const router = Router(); // ✅ should be Router, not Application

router.post("/signup", signup);
router.post("/login", login);

export default router;
