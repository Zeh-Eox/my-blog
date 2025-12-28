/// <reference path="../types/express.d.ts" />

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.user = { id: Number(payload.sub) };

    return next();
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}