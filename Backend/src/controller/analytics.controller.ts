import type { Request, Response, NextFunction } from "express";
import { ClickEvent } from "../models/events.model";

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortID } = req.params;
    if (!shortID) {
      return res.status(400).json({
        message: "URl is not Correct!",
      });
    }

    // aggregation logic
    const result = await ClickEvent.aggregate([
      { $match: { shortID } },
      {
        $group: {
          _id: "$shortID",
          totalClicks: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      totalClicks: result[0]?.totalClicks || 0,
    });
  } catch (error) {
    next(error);
  }
};
