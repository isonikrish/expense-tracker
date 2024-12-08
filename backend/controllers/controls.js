import { transactionSchema } from "../config/zodSchemas.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export async function handleAddBalance(req, res) {
  try {
    const userId = req.user._id;
    const { amount } = req.body;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (!amount) {
      return res.status(400).json({ msg: "Amount not added" });
    }

    user.balance += amount;
    await user.save();

    return res.status(200).json({ msg: "Balance updated" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
export async function handleAddTransaction(req, res) {
  try {
    
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }


    const data = req.body;
    const validatedData = transactionSchema.safeParse(data);
    if (!validatedData.success) {
      return res.status(400).json({ msg: "Inputs are not correct", errors: validatedData.error.errors });
    }


    const { type, amount, category } = validatedData.data;

    const newTransaction = new Transaction({
      userId,
      type,
      amount,
      category,
    });

    await newTransaction.save();


    if (newTransaction) {
      if (type === "expense") {
        user.balance -= amount;
      } else if (type === "income") {
        user.balance += amount;
      }
      await user.save();
    }


    return res.status(201).json({ msg: "Transaction added successfully", transaction: newTransaction, balance: user.balance });

  } catch (error) {
    console.error("Error processing transaction:", error);
    return res.status(500).json({ msg: "Server error, please try again later" });
  }
}

export async function handleGetExpenseTransactions(req,res){
  
}