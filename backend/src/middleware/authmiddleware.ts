import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  try {
    const verified = jwt.verify(token, env.jwtSecret);

    if (typeof verified === "string" || !("id" in verified)) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    req.user = verified as AuthPayload;

    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid token",
    });
  }
};
