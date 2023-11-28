import { JwtPayload } from "jsonwebtoken";
import express from "express";

export interface RequestWithToken extends express.Request {
  token: string | JwtPayload;
}
