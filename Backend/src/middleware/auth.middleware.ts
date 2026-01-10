import type { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/passwordAndJWT";

export const authenticateMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = verifyJWT(token);
    (req as any).user = decode; // <- this can be optimised further
    next();
  } catch (error) {
    next(error);
  }
};
