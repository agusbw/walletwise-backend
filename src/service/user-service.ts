import validate from "../validation";
import { Request } from "express";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validation/user-validation";
import prisma from "../db/db";
import { z } from "zod";
import ResponseError from "../error/response-error";
import { hash, compare } from "bcrypt";
import { generateAccessToken } from "../helper";

const register = async (req: Request) => {
  let user: z.infer<typeof registerUserSchema> = validate(
    registerUserSchema,
    req
  );

  //check if user exists
  const isExist = await prisma.user.count({
    where: {
      email: user.email,
    },
  });

  if (isExist) throw new ResponseError("User already exists", 400);

  //hash password
  user.password = await hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      email: true,
      name: true,
    },
  });
};

const login = async (req: Request) => {
  const user: z.infer<typeof loginUserSchema> = validate(loginUserSchema, req);

  //check if user exists
  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!dbUser) throw new ResponseError("Wrong Email or password", 401);

  //check if password is correct
  const isPasswordCorrect = await compare(user.password, dbUser.password);

  if (!isPasswordCorrect)
    throw new ResponseError("Wrong Email or password", 401);

  //generate token
  const token = generateAccessToken({
    email: dbUser.email,
    role: dbUser.role,
  });

  return {
    token,
  };
};

export default {
  register,
  login,
};
