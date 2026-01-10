import express from "express";
import { getUrl, postUrl } from "../controller/url.controller";
export const urlRouter = express.Router();

urlRouter.post("/shortURL", postUrl);
urlRouter.get("/:shortURL", getUrl);
