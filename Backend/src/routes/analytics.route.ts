import express, { Response } from "express";
import {
  getAnalytics,
  getPerLinkAnalytics,
} from "../controller/analytics.controller";
import { authenticateMe } from "../middleware/auth.middleware";

export const analyticRouter = express.Router();

analyticRouter.get("/analytics/test", authenticateMe, (res: Response) => {
  return res.send("Router works!");
});
analyticRouter.get("/analytics/over-all", authenticateMe, getAnalytics);
analyticRouter.get("/analytics/:shortID", authenticateMe, getPerLinkAnalytics);
