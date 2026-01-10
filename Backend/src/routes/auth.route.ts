import express from "express";
import { loginUser, logout, registerUser } from "../controller/auth.controller";

export const authRouter = express.Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/logout", logout);
