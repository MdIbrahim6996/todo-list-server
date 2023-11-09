import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import TodoRouter from "./routes/todo.routes";
import AuthRouter from "./routes/auth.routes";
import { isAuth } from "./middlewares/isAuth";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

export const app: Application = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", isAuth, (req: any, res) => {
  console.log(req.user);

  res.send("ok");
});
app.use("/api/auth", AuthRouter);
app.use("/api/todo", TodoRouter);

app.use("*", (req, res, next) => {
  throw new Error("this route does not exist");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong";
  res.send({
    status,
    message,
  });
});

// sdasd
