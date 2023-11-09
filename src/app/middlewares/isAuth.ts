import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: any, response: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Token Not Found. Login Again !!!");
    } else {
      const verifyToken: any = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      console.log(verifyToken, "sdfsdfsdfd");

      if (verifyToken) {
        req.user = verifyToken?.id;
      } else {
        throw new Error("Token Expired. Login Again !!!");
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
