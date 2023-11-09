import { Schema, model } from "mongoose";

export interface ITodo {
  title: string;
  description: string;
}
const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", TodoSchema);
