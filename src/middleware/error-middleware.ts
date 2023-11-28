import { ZodError } from "zod";
import ResponseError from "../error/response-error";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ResponseError) {
    if (!err) {
      next();
      return;
    }
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else if (err instanceof ZodError) {
    res
      .status(400)
      .json({
        errors: err.issues,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: err.message,
      })
      .end();
  }
};

export default errorMiddleware;
