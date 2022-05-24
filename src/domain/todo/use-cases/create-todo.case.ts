import { Context } from "oak";
import { ToDoModel } from "../models/todo.model.ts";
import { CreateToDoRequest } from "../types/create-todo.request.ts";
import { AppState } from "../../../types/state.ts";
import { ToDoService } from "../services/todo.service.ts";

export class CreateToDoCase {
  constructor(
    private readonly dependencies: Context<AppState>,
    private readonly toDoService: ToDoService
  ) {}

  async execute(payload: CreateToDoRequest): Promise<ToDoModel> {
    this.dependencies.state.logger.debug("CreateUserCase");
    const todo = await this.toDoService.createToDo(payload);
    return todo;
  }
}
