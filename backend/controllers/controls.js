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
