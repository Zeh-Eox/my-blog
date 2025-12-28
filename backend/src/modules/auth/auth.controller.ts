import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.shema";
import { loginUser, registerUser } from "./auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await registerUser(data);

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: any) => {
  try {
    const data = loginSchema.parse(req.body);
    const response = await loginUser(data);
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
