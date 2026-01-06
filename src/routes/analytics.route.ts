import express from "express";
import { getAnalytics } from "../controller/analytics.controller";

export const analyticRouter = express.Router();

analyticRouter.get("/analytics/test", (req, res) => res.send("Router works!"));
analyticRouter.get("/analytics/:shortID", getAnalytics);
