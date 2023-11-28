import jwt from "jsonwebtoken";
import express from "express";
import { RequestWithToken } from "../utils/types";
import { Role } from "@prisma/client";

const adminMiddleware = async (
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
    const { role } = decoded as { role: Role };
    if (role !== "ADMIN") {
      return res.status(401).send("Access Denied");
    }

    next();
  } catch (error) {
    res.status(401).send("Access Denied");
  }

  next();
};

export default adminMiddleware;
