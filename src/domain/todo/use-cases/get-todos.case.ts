import { Context } from "oak";
import { ToDoModel } from "../models/todo.model.ts";
import { AppState } from "../../../types/state.ts";
import { ToDoService } from "../services/todo.service.ts";

export class GetToDoCase {
  constructor(
    private readonly dependencies: Context<AppState>,
    private readonly todoService: ToDoService
  ) {}

  async execute(): Promise<ToDoModel[]> {
    this.dependencies.state.logger.debug("GetToDosCase");
    const todos = await this.todoService.getToDos();
    return todos;
  }
}
