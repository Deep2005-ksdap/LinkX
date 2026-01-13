import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/passwordAndJWT";

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) return next();

  try {
    const user = verifyJWT(token);
    req.user = user;
  } catch (error) {
    next(error);
  }

  next();
};
