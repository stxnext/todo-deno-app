import { Context } from "oak";
import { ToDoModel } from "../models/todo.model.ts";
import { UpdateToDoStatusRequest } from "../types/update-todo-status.request.ts";
import { AppState } from "../../../types/state.ts";
import { ToDoService } from "../services/todo.service.ts";

export class UpdateToDoStatusCase {
  constructor(
    private readonly dependencies: Context<AppState>,
    private readonly toDoService: ToDoService
  ) {}

  async execute(payload: UpdateToDoStatusRequest): Promise<ToDoModel> {
    this.dependencies.state.logger.debug("UpdateToDoStatusCase");
    const todo = await this.toDoService.updateToDoStatus(payload);
    return todo;
  }
}
