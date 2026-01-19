import type { Request, Response, NextFunction } from "express";
import { ClickEvent } from "../models/events.model";
import { Url } from "../models/url.model";

type ClickByDate = {
  _id: string;
  clicks: number;
};
type TrafficSource = {
  _id: string | null; // referrer
  clicks: number;
};
type TopLink = {
  _id: string; // shortID
  clicks: number;
  lastClick: Date;
};

export const getPerLinkAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shortID } = req.params;
    if (!shortID) {
      return res.status(400).json({
        message: "URl is not Correct!",
      });
    }

    // Combined aggregation using $facet for efficiency
    const analyticsAgg = await ClickEvent.aggregate([
      { $match: { shortID } },
      {
        $facet: {
          totalClicks: [
            {
              $group: {
                _id: "$shortID",
                totalClicks: { $sum: 1 },
              },
            },
          ],
          clicksByDate: [
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
          ],
          referrorClicks: [
            {
              $group: {
                _id: "$referrer",
                clicks: { $sum: 1 },
              },
            },
            { $sort: { clicks: -1 } },
          ],
          lastClick: [
            { $sort: { timestamp: -1 } },
            { $limit: 1 },
            { $project: { timestamp: 1 } },
          ],
        },
      },
    ]);

    const result = analyticsAgg[0];
    const totalClicks = result.totalClicks[0]?.totalClicks || 0;
    const clicksByDate = result.clicksByDate.map((item: ClickByDate) => ({
      date: item._id,
      clicks: item.clicks,
    }));
    const referrorClicks = result.referrorClicks.map((item: TrafficSource) => ({
      referrer: item._id || "unknown",
      clicks: item.clicks,
    }));
    const lastClickedAt = result.lastClick[0]?.timestamp || null;

    return res.status(200).json({
      totalClicks,
      clicksByDate,
      lastClickedAt,
      referrorClicks,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const allLinkOfOwner = await Url.find({ owner: userId }).select("shortID");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalLinks = allLinkOfOwner.length;
    const shortIDs = allLinkOfOwner.map((i) => i.shortID);

    // Combined aggregation using $facet for efficiency
    const analyticsAgg = await ClickEvent.aggregate([
      { $match: { shortID: { $in: shortIDs } } },
      {
        $facet: {
          totalClicks: [{ $count: "count" }],
          todayClicks: [
            { $match: { timestamp: { $gte: today } } },
            { $count: "count" },
          ],
          uniqueIPs: [{ $group: { _id: "$ipHash" } }, { $count: "count" }],
          clickOverTime: [
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
          ],
          trafficSources: [
            {
              $group: {
                _id: { $ifNull: ["$referrer", "direct"] },
                clicks: { $sum: 1 },
              },
            },
            { $sort: { clicks: -1 } },
          ],
          topLinks: [
            {
              $group: {
                _id: "$shortID",
                clicks: { $sum: 1 },
                lastClick: { $max: "$timestamp" },
              },
            },
            { $sort: { clicks: -1 } },
            { $limit: 5 },
          ],
        },
      },
    ]);

    const result = analyticsAgg[0];
    const kpis = {
      totalClicks: result.totalClicks[0]?.count || 0,
      todayClicks: result.todayClicks[0]?.count || 0,
      uniqueIPs: result.uniqueIPs[0]?.count || 0,
    };
    const clickOverTime = result.clickOverTime.map((i: ClickByDate) => ({
      date: i._id,
      clicks: i.clicks,
    }));
    const trafficSources = result.trafficSources.map((t: TrafficSource) => ({
      source: t._id,
      clicks: t.clicks,
    }));
    const topLinks = result.topLinks.map((t: TopLink) => ({
      shortID: t._id,
      clicks: t.clicks,
      lastClick: t.lastClick,
    }));

    return res.status(200).json({
      totalLinks,
      kpis,
      clickOverTime,
      trafficSources,
      topLinks, // Added if needed
    });
  } catch (error) {
    next(error);
  }
};
