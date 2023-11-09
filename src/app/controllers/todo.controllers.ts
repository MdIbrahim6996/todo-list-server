import { NextFunction, Request, Response } from "express";
import Todo from "../models/todo.model";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({ title, description });
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
};

export const allTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    console.log(error);
  }
};

export const singleTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
};
