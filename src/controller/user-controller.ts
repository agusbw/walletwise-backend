import { NextFunction, Request, Response } from "express";
import userService from "../service/user-service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.register(req);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.login(req);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: "Hello Admin",
  });
};

export default {
  register,
  login,
  adminOnly,
};
