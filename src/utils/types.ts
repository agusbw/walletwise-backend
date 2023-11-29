import { JwtPayload } from "jsonwebtoken";
import express from "express";
import { z } from "zod";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validation/user-validation";

export interface RequestWithToken extends express.Request {
  token: string | JwtPayload;
}

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type LoginUserSchema = z.infer<typeof loginUserSchema>;
