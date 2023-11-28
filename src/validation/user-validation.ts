import { z } from "zod";

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  name: z.string().min(1).max(100),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export { registerUserSchema, loginUserSchema };
