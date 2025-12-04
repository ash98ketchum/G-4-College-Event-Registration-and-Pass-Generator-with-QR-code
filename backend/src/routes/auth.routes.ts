import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Get logged-in user details
router.get("/me", requireAuth, me);

export default router;
