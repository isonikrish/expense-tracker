import { loginSchema, signupSchema } from "../config/zodSchemas.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function handleSignup(req, res) {
  const data = req.body;
  try {
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success)
      return res.status(400).json({ msg: "Invalid Data" });
    const { username, email, password } = validatedData.data;
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ msg: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    if (!newUser) return res.status(400).json({ msg: "User is not created" });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
    }
    return res.status(200).json({ msg: "New user created" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
export async function handleLogin(req, res) {
  const data = req.body;
  try {
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success)
      return res.status(400).json({ msg: "Invalid Data" });
    const { email, password } = validatedData.data;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not exists" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({ msg: "Logged In Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
export async function handleLogout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ msg: "Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
export async function handleGetMe(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(400).json({ msg: "No user id provided" });
    const user = await User.findById(userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
