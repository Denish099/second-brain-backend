import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  addContent,
  getContent,
  deleteContent,
} from "../controllers/contentController";
const router = Router();

router.post("/", authenticateToken, addContent);
router.get("/", authenticateToken, getContent);
router.delete("/", authenticateToken, deleteContent);
export default router;
