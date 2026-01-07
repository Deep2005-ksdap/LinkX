import express, { Response } from "express";
import { getAnalytics } from "../controller/analytics.controller";
import { authenticateMe } from "../middleware/auth.middleware";

export const analyticRouter = express.Router();

analyticRouter.get("/analytics/test", authenticateMe, (res: Response) => {
  res.send("Router works!");
});
analyticRouter.get("/analytics/:shortID", authenticateMe, getAnalytics);
