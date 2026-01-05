import type { Request, Response, NextFunction } from "express";
import { generateShortId } from "../utils/base62";
import { Url } from "../models/url.model";

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

    //check if not URL not already exists
    const existingUrl = await Url.findOne({ fullUrl });
    if (existingUrl) {
      return res.json({
        shortCode: existingUrl.shortID,
        fullUrl: existingUrl.fullUrl,
      });
    }

    const shortID = generateShortId();
    const urlDoc = await Url.create({
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

    getUrlFromDB.clicks += 1;
    await getUrlFromDB.save();

    res.redirect(302, getUrlFromDB.fullUrl);
  } catch (error) {
    next(error);
  }
};
