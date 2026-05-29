import { Router } from "express";
import { login, me, signup } from "../controllers/authController";
import { authenticateToken } from "../middleware/authmiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/register", signup);
router.post("/login", login);
router.get("/me", authenticateToken, me);

export default router;
