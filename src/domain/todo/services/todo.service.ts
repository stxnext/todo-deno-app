/**
 * Service implementains
 *
 * Operations on repositories
 * Export methods to other domains
 */
import { ToDoModel } from "../models/todo.model.ts";
import { CreateToDoRequest } from "../types/create-todo.request.ts";
import { DeleteToDoRequest } from "../types/delete-todo.request.ts";
import { DeleteToDoResponse } from "../types/delete-todo.response.ts";
import { UpdateToDoStatusRequest } from "../types/update-todo-status.request.ts";
import { Database } from "denodb";
import { HttpError } from "oak";
import { ToDoNotFoundError } from "../errors/todo-not-found.error.ts";

export class ToDoService {
  constructor(private database: Database) {}

  async createToDo({ text }: CreateToDoRequest): Promise<ToDoModel> {
    try {
      const todo = await ToDoModel.create({
        text,
      });
      return todo;
    } catch (error) {
      console.log(error);
      throw new HttpError("Something went wrong!");
    }
  }

  async getToDos(): Promise<ToDoModel[]> {
    try {
      const users = await ToDoModel.all();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteToDo({ id }: DeleteToDoRequest): Promise<DeleteToDoResponse> {
    try {
      await ToDoModel.deleteById(id);
      return { status: "ok", message: "Todo deleted successfully" };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateToDoStatus({ id }: UpdateToDoStatusRequest): Promise<ToDoModel> {
    try {
      const todo = await ToDoModel.find(id);
      console.log(todo);
      if (!todo) {
        console.log("not found");
        throw new ToDoNotFoundError();
      }

      todo.completed = !todo.completed;
      await todo.update();

      return todo;
    } catch (error) {
      throw error;
    }
  }
}
