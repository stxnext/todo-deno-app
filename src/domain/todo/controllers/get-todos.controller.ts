import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { GetToDoCase } from "../use-cases/get-todos.case.ts";
import { ToDoService } from "../services/todo.service.ts";

export class GetToDosController {
  async handle(context: Context<AppState>) {
    context.state.logger.debug("GetToDoController");
    const users = await new GetToDoCase(
      context,
      new ToDoService(context.state.databaseClient)
    ).execute();
    context.response.body = JSON.stringify(users);
  }
}
