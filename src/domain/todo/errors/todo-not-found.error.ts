import { HttpError, Status } from "oak";

export class ToDoNotFoundError extends HttpError {
  public status: Status = Status.NotFound;

  constructor() {
    super("Todo not found");
  }
}
