import { Middleware } from "oak";
import { AppState } from "../../types/state.ts";
import { ToDoNotFoundError } from "../../domain/todo/errors/todo-not-found.error.ts";

export const errorMiddleware: Middleware<AppState> = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error.constructor);
    switch (error.constructor) {
      case ToDoNotFoundError:
        ctx.state.logger.warning(error);
        ctx.response.status = error.status;
        ctx.response.body = { message: error.message };
        break;
      default:
        if (error.status && error.message) {
          ctx.response.status = error.status;
          ctx.response.body = { message: error.message };
        } else {
          ctx.response.status = 500;
          ctx.response.body = { message: "Internal server error" };
        }
        break;
    }
  }
};
