import express from 'express';
import { handleGetMe, handleLogin, handleLogout, handleSignup } from '../controllers/auth.js';
import { protectRoute } from '../utils/protectRoute.js';
const router = express.Router();

router.post("/auth/signup",handleSignup);
router.post("/auth/login",handleLogin);
router.post("/auth/logout",protectRoute,handleLogout);
router.get("/auth/me",protectRoute, handleGetMe);

export default router;