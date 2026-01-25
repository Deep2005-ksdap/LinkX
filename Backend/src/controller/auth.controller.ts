import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { User, UserDocument } from "../models/user.model";
import {
  assingJWT,
  comparePassword,
  hashedPass,
} from "../utils/passwordAndJWT";

export const registerUser = [
  // Validation chain middlewares
  body("fullname").exists().withMessage("Fullname is required"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 chars long"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, message: errors.array() });
      }

      const { fullname, email, password }: Partial<UserDocument> = req.body;

      //if already exist user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists" });
      }

      //type narrowing of password
      if (typeof password !== "string") {
        throw new Error("Password is required");
      }
      const hash = await hashedPass(password);
      await User.create({ fullname, email, password: hash });
      return res
        .status(200)
        .json({ success: true, message: "user Created Successfuly" });
    } catch (error) {
      next(error);
    }
  },
];

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = assingJWT(user._id.toString()); // id need to be in string

    res.cookie("token", token, {
      httpOnly: true, //prevent from xss attack
      secure: true, // only on HTTPS
      sameSite: "none", // needed for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout successful",
  });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
