import express, { Router } from "express";
import userController from "../controller/user-controller";
import authMiddleware from "../middleware/auth-middleware";
import adminMiddleware from "../middleware/admin-middleware";

const userRouter: Router = express.Router();

userRouter.get(
  "/api/users",
  authMiddleware,
  adminMiddleware,
  userController.adminOnly
);

export default userRouter;
