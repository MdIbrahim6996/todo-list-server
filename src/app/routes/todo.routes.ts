import { Router } from "express";
import {
  allTodo,
  createTodo,
  deleteTodo,
  singleTodo,
  updateTodo,
} from "../controllers/todo.controllers";

const router = Router();

router.post("/create", createTodo);
router.get("/", allTodo);
router.get("/:id", singleTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
