import jwt from "jsonwebtoken";

function generateAccessToken(payload: { email: string; role: string }) {
  const secret = process.env.TOKEN_SECRET as string;
  return jwt.sign(payload, secret, {
    expiresIn: "1800s",
  });
}

export { generateAccessToken };
