import express, { Router } from "express";
import userController from "../controller/user-controller";
import authMiddleware from "../middleware/auth-middleware";

const userRouter: Router = express.Router();

userRouter.get("/api/users", authMiddleware("USER"), userController.adminOnly);

export default userRouter;
