import type { Request, Response, NextFunction } from "express";
import { generateShortId } from "../utils/base62";
import { Url } from "../models/url.model";
import { ClickEvent } from "../models/events.model";

export const postUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullUrl } = req.body;
    const userId = req.user?.userId;
    try {
      new URL(fullUrl);
    } catch {
      return res.status(400).json({
        success: false,
        msg: "Invalid URL!",
      });
    }

    // ✅ Guest users → always create new short URL
    if (!userId) {
      let shortID;
      do {
        shortID = generateShortId();
      } while (await Url.findOne({ shortID }));

      await Url.create({ fullUrl, shortID });

      const shortUrl = `${req.protocol}://${req.get("host")}/${shortID}`;

      return res.status(201).json({
        success: true,
        shortUrl,
      });
    }

    // ✅ Logged-in users → check existing URL only for that user
    const existingUrl = await Url.findOne({ fullUrl, owner: userId });

    if (existingUrl) {
      const shortUrl = `${req.protocol}://${req.get("host")}/${existingUrl.shortID}`;
      return res.json({
        success: true,
        isAlreadyExist: true,
        shortUrl,
      });
    }

    // ✅ Create new short URL
    let shortID;
    do {
      shortID = generateShortId();
    } while (await Url.findOne({ shortID }));

    await Url.create({
      fullUrl,
      shortID,
      owner: userId,
    });

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortID}`;

    res.status(201).json({
      success: true,
      shortUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shortID } = req.params;

    const getUrlFromDB = await Url.findOne({ shortID: shortID });
    // console.log({ getUrlFromDB });
    if (!getUrlFromDB) {
      return res.status(404).json({ msg: "Short URL not found" });
    }

    // LOG EVENT (append-only)
    await ClickEvent.create({
      shortID: shortID,
      userAgent: req.headers["user-agent"],
      ipHash: req.ip, // later need to hash it
      referrer: req.headers.referer || "direct",
    });
    await getUrlFromDB.save();

    res.redirect(302, getUrlFromDB.fullUrl);
  } catch (error) {
    next(error);
  }
};

export const getAllUrls = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    const allLinks = await Url.find({ owner: userId });

    return res.status(200).json({
      allLinks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { shortID } = req.params;
    const userId = req.user?.userId;

    const url = await Url.findOne({ shortID });
    if (!url) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }
    if (!url.owner) {
      return res
        .status(403)
        .json({ success: false, message: "URL has no owner" });
    }
    if (url.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    await Url.deleteOne({ _id: url._id });

    return res.status(200).json({
      success: true,
      message: "delete successfully",
    });
  } catch (error) {
    next(error);
  }
};
