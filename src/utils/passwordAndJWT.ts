import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secretKey } from "../config/jwt.config";

export const hashedPass = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error in hashing password: ", error);
    throw new Error("Could not hash password");
  }
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw new Error("Could not compare password");
  }
};

export const assingJWT = (userId: string) => {
  return jwt.sign({ userId }, secretKey, {
    expiresIn: "1d",
  });
};

export const verifyJWT = (token:string) => {
  return jwt.verify(token, secretKey)
}
