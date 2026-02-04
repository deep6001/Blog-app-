import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controller/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import User from '../models/auth.model.js';

const router = express.Router();
// Sample authentication route

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // req.user.id comes from JWT
    const user = await User.findById(req.user.id)
      .select("-password"); // remove password

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ user });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;