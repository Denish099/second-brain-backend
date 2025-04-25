import { Router, Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
const router: Router = Router();

router.post("/login", (req: Request, res: Response) => {
  res.json({ message: "Login route" });
});

router.post("/signup", (req: Request, res: Response) => {
  res.json({ message: "signup route" });
});

export default router;
