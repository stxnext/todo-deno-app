import { RouteParams, Router } from "oak";
import { AppState } from "../../types/state.ts";
import { GetToDosController } from "./controllers/get-todos.controller.ts";
import { CreateToDoController } from "./controllers/create-todo.controller.ts";
import { DeleteToDoController } from "./controllers/delete-todo.controller.ts";
import { UpdateToDoStatusController } from "./controllers/update-todo-status.controller.ts";
import { validatorMiddleware } from "../../shared/middlewares/validation.middleware.ts";
import { CreateToDoValidation } from "./validators/create-todo.validator.ts";

export const toDoRouter = new Router<RouteParams, Partial<AppState>>();

toDoRouter
  .use((ctx, next) => {
    ctx.state.logger!.debug("Todo router");
    return next();
  })
  .get("/todos", new GetToDosController().handle)
  .post(
    "/todo",
    validatorMiddleware<AppState>(CreateToDoValidation),
    new CreateToDoController().handle
  )
  .delete("/todo", new DeleteToDoController().handle)
  .patch("/todo/:id", new UpdateToDoStatusController().handle);
