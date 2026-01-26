import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDb } from "./config/db";
import { urlRouter } from "./routes/url.route";
import { errorHandler } from "./middleware/error.middleware";
import { analyticRouter } from "./routes/analytics.route";
import { authRouter } from "./routes/auth.route";
// cron job
import "./cron/linkCleanup.cron";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_API || "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res
    .status(dbStatus === "connected" ? 200 : 500)
    .json({ status: "ok", db: dbStatus });
});

app.use(urlRouter);
app.use(authRouter);
app.use(analyticRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
