import { Router } from "express";
import { login, signup } from "../controllers/authController";

const router = Router();

router.post("/login", login); // login route -> login controller
router.post("/signup", signup); // signup route -> signup controller

export default router;
