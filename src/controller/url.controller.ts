import type { Request, Response, NextFunction } from "express";
import { generateShortId } from "../utils/base62";
import { Url } from "../models/url.model";
import { ClickEvent } from "../models/events.model";

export const postUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullUrl } = req.body;
    try {
      new URL(fullUrl); // validates URL
    } catch {
      return res.status(400).json({ msg: "Invalid URL format" });
    }

    //check if URL not already exists
    const existingUrl = await Url.findOne({ fullUrl });
    if (existingUrl) {
      const shortUrl = `${req.protocol}://${req.get("host")}/${
        existingUrl.shortID
      }`;

      return res.json({
        shortUrl,
        fullUrl: existingUrl.fullUrl,
      });
    }

    //uniqueness of shortID
    let shortID;
    let existingShortID;
    do {
      shortID = generateShortId();
      existingShortID = await Url.findOne({ shortID });
    } while (existingShortID);

    await Url.create({
      fullUrl,
      shortID,
    });
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortID}`;

    res.status(201).json({
      shortUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shortURL = req.params.shortURL;

    const getUrlFromDB = await Url.findOne({ shortID: shortURL });
    // console.log({ getUrlFromDB });
    if (!getUrlFromDB) {
      return res.status(404).json({ msg: "Short URL not found" });
    }

    // LOG EVENT (append-only)
    await ClickEvent.create({
      shortID: shortURL,
      userAgent: req.headers["user-agent"],
      ipHash: req.ip, // later need to hash it
      referrer: req.headers.referer,
    });
    await getUrlFromDB.save();

    res.redirect(302, getUrlFromDB.fullUrl);
  } catch (error) {
    next(error);
  }
};
