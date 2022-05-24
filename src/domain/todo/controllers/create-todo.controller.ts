import { Context } from "oak";
import { AppState } from "../../../types/state.ts";
import { CreateToDoRequest } from "../types/create-todo.request.ts";
import { CreateToDoCase } from "../use-cases/create-todo.case.ts";
import { ToDoService } from "../services/todo.service.ts";

export class CreateToDoController {
  async handle(context: Context<AppState>) {
    context.state.logger.debug("CreateUserController");
    const body = (await context.request.body({ type: "json" })
      .value) as CreateToDoRequest;
    const user = await new CreateToDoCase(
      context,
      new ToDoService(context.state.databaseClient)
    ).execute(body);
    context.response.status = 201;
    context.response.body = JSON.stringify(user);
  }
}
