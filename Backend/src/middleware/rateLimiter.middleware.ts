import { Request, Response, NextFunction } from "express";
import { RateLimiter } from "../services/RateLimiter";

const limiter = new RateLimiter(10, 1);

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = req.ip || "unknown";

  if (!limiter.allowReq(key)) {
    res.status(429).json({
      message: "Too Many Requests",
    });
    return;
  }

  next();
};
