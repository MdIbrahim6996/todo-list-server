import jwt from "jsonwebtoken";
import config from "config";

const secret = config.get("secret");

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secret as string, {
    expiresIn: "30d",
  });
};
