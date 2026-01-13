import express from "express";
import {
  getMe,
  loginUser,
  logout,
  registerUser,
} from "../controller/auth.controller";
import { authenticateMe } from "../middleware/auth.middleware";

export const authRouter = express.Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", loginUser);
authRouter.get("/auth/me", authenticateMe, getMe);
authRouter.post("/auth/logout", logout);
