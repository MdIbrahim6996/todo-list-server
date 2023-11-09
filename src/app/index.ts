import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import TodoRouter from "./routes/todo.routes";
import AuthRouter from "./routes/auth.routes";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

export const app: Application = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", AuthRouter);
app.use("/api/todo", TodoRouter);
