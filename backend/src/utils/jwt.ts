const jwt = require("jsonwebtoken");
import { jwtInterface } from "../types/jwtInterface";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "7d";

export const generateToken = (
  payload: Omit<jwtInterface, "exp" | "iat">
): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verityToken = (token: string): jwtInterface | null => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, JWT_SECRET) as jwtInterface;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
