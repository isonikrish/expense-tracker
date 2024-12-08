import express from 'express';
import { protectRoute } from '../utils/protectRoute.js';
import { handleAddBalance } from '../controllers/controls.js';
const router = express.Router();

router.put("/controls/add-balance",protectRoute, handleAddBalance )

export default router;