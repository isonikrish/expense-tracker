import express from 'express';
import { protectRoute } from '../utils/protectRoute.js';
import { handleAddBalance, handleAddTransaction, handleGetExpenseTransactions, handleGetTransactionHistory } from '../controllers/controls.js';
const router = express.Router();

router.put("/controls/add-balance",protectRoute, handleAddBalance )
router.post("/controls/add-transaction", protectRoute, handleAddTransaction)
router.get("/controls/expense-transactions",protectRoute ,handleGetExpenseTransactions);
router.get("/controls/transaction-history",protectRoute,handleGetTransactionHistory)
export default router;