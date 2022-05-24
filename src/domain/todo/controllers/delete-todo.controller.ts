import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { DeleteToDoCase } from "../use-cases/delete-todo.case.ts";
import { ToDoService } from "../services/todo.service.ts";
import { DeleteToDoRequest } from "../types/delete-todo.request.ts";

export class DeleteToDoController {
  async handle(context: Context<AppState>) {
    context.state.logger.debug("DeleteToDoController");
    const body = (await context.request.body({ type: "json" })
      .value) as DeleteToDoRequest;
    const response = await new DeleteToDoCase(
      context,
      new ToDoService(context.state.databaseClient)
    ).execute(body);
    context.response.status = 201;
    context.response.body = JSON.stringify(response);
  }
}
