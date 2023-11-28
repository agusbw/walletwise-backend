import jwt from "jsonwebtoken";
import express from "express";
import { RequestWithToken } from "../utils/types";

const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    (req as RequestWithToken).token = decoded;
    next();
  } catch (error) {
    res.status(401).send("Access Denied");
  }
};

export default authMiddleware;
