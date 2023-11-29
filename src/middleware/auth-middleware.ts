import jwt from "jsonwebtoken";
import express from "express";
import { RequestWithToken } from "../utils/types";
import { Role } from "@prisma/client";

const authMiddleware =
  (roleNeeded: Role) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Access Denied");
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
      (req as RequestWithToken).token = decoded;
      const { role: userRole } = decoded as { role: Role };

      //admin just go through
      if (userRole === "ADMIN") {
        next();
        return;
      }

      //if user role is not the same as role needed, then access denied
      if (userRole !== roleNeeded) {
        return res.status(401).send("Access Denied");
      }

      next();
    } catch (error) {
      res.status(401).send("Access Denied");
    }
  };

export default authMiddleware;
