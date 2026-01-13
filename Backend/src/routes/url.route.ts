import express from "express";
import { getAllUrls, getUrl, postUrl } from "../controller/url.controller";
import { optionalAuth } from "../middleware/optionalAuth";
import { authenticateMe } from "../middleware/auth.middleware";
export const urlRouter = express.Router();

urlRouter.post("/shortURL", optionalAuth, postUrl);
urlRouter.get("/my-url", authenticateMe, getAllUrls);
urlRouter.get("/:shortURL", getUrl);
