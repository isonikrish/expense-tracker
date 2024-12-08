import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/dbConfig.js";
import authRoutes from "./routes/auth.js";
import controllRoutes from './routes/controls.js'
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", controllRoutes)
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server Started");
  });
});
