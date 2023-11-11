import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User ALready Exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User Doesn't Exist");
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser?.password
    );
    if (!comparePassword) {
      throw new Error("Invalid Credentials");
    } else {
      let token = generateToken(existingUser?.id);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.send({ user: existingUser, token });
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  res.send("logout succeess");
  try {
  } catch (error) {
    console.log(error);
  }
};
