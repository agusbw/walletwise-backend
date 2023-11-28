import express, { Router } from "express";
import userController from "../controller/user-controller";

const publicRouter: Router = express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export default publicRouter;
