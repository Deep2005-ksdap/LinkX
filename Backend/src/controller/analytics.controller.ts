import type { Request, Response, NextFunction } from "express";
import { ClickEvent } from "../models/events.model";
import { Url } from "../models/url.model";

export const getPerLinkAnalytics = async (
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
    const totalClicksAgg = await ClickEvent.aggregate([
      { $match: { shortID } },
      {
        $group: {
          _id: "$shortID",
          totalClicks: { $sum: 1 },
        },
      },
    ]);

    const clickByDateAgg = await ClickEvent.aggregate([
      { $match: { shortID } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$timestamp",
            },
          },
          clicks: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const clicksByDate = clickByDateAgg.map((i) => {
      date: i._id;
      clicks: i.clicks;
    });

    const lastClick = await ClickEvent.findOne(
      { shortID }, //find event by ID
      { timestamp: 1 } // return only createAt
    ).sort({ timestamp: -1 }); //sort it in latest

    const referrarAgg = await ClickEvent.aggregate([
      { $match: { shortID } },
      {
        $group: {
          _id: "$referrer",
          clicks: { $sum: 1 },
        },
      },
      { $sort: { clicks: -1 } },
    ]);
    const referrorClicks = referrarAgg.map((item) => {
      referrer: item._id;
      clicks: item.clicks;
    });

    return res.status(200).json({
      totalClicks: totalClicksAgg[0]?.totalClicks || 0,
      clicksByDate,
      lastClickedAt: lastClick?.timestamp || null,
      referrorClicks,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const allLinkOfOwner = await Url.find({ owner: userId }).select("shortID");

    const totalLinks = allLinkOfOwner.length;
    const shortIDs = allLinkOfOwner.map((i) => i.shortID);

    const totalLinkClicksAgg = await ClickEvent.aggregate([
      { $match: { shortIDs } },
      {
        $group: {
          _id: { shortIDs },
          clicks: { $sum: 1 },
        },
      },
      { $sort: { clicks: -1 } },
    ]);

    return res.status(200).json({
      totalLinks,
      totalClicks: totalLinkClicksAgg[0]?.clicks || 0,
    });
  } catch (error) {
    next(error);
  }
};
