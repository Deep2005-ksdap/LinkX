import express from "express";
import {
  deleteUrl,
  getAllUrls,
  getUrl,
  postUrl,
} from "../controller/url.controller";
import { optionalAuth } from "../middleware/optionalAuth";
import { authenticateMe } from "../middleware/auth.middleware";
import { rateLimiter } from "../middleware/rateLimiter.middleware";
export const urlRouter = express.Router();

urlRouter.post("/shortURL", rateLimiter, optionalAuth, postUrl);
urlRouter.get("/my-url", authenticateMe, getAllUrls);
urlRouter.get("/:shortID", getUrl);
urlRouter.delete("/:shortID", authenticateMe, deleteUrl);
