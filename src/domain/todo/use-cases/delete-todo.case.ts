import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { ToDoService } from "../services/todo.service.ts";
import { DeleteToDoRequest } from "../types/delete-todo.request.ts";
import { DeleteToDoResponse } from "../types/delete-todo.response.ts";

export class DeleteToDoCase {
  constructor(
    private readonly dependencies: Context<AppState>,
    private readonly toDoService: ToDoService
  ) {}

  async execute(payload: DeleteToDoRequest): Promise<DeleteToDoResponse> {
    this.dependencies.state.logger.debug("DeleteUserCase");
    const response = await this.toDoService.deleteToDo(payload);
    return response;
  }
}
