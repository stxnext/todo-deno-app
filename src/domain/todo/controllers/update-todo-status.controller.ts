import { RouterContext, RouteParams } from "oak";
import { AppState } from "../../../types/state.ts";
import { UpdateToDoStatusCase } from "../use-cases/update-todo-status.case.ts";
import { ToDoService } from "../services/todo.service.ts";
import { UpdateToDoStatusRequest } from "../types/update-todo-status.request.ts";

export class UpdateToDoStatusController {
  async handle(context: RouterContext<RouteParams, AppState>) {
    context.state.logger.debug("UpdateToDoStatusController");

    const id = {
      id: context?.params?.id,
    } as UpdateToDoStatusRequest;
    const todo = await new UpdateToDoStatusCase(
      context,
      new ToDoService(context.state.databaseClient)
    ).execute(id);
    context.response.status = 201;
    context.response.body = JSON.stringify(todo);
  }
}
