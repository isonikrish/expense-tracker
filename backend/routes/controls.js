import express from 'express';
import { protectRoute } from '../utils/protectRoute.js';
import { handleAddBalance, handleAddTransaction, handleGetExpenseTransactions } from '../controllers/controls.js';
const router = express.Router();

router.put("/controls/add-balance",protectRoute, handleAddBalance )
router.post("/controls/add-transaction", protectRoute, handleAddTransaction)
router.get("/controls",protectRoute ,handleGetExpenseTransactions);
export default router;