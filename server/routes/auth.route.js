import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", authenticate, (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/verify", authenticate, (req, res) => {
  res.json({ 
    user: { 
      id: req.user._id,
      username: req.user.username, 
      role: req.user.role 
    } 
  });
});

export default router;