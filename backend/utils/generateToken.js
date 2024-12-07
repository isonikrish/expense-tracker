import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    if (!token) return res.status(400).json({ msg: "No Token" });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      path: "/",
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
