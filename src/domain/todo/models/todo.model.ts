import { DataTypes, Model } from "denodb";

export interface ToDoPayload {
  _id: string;
  text: string;
  completed: boolean;
}
export class ToDoModel extends Model {
  static table = "todos";
  static timestamps = true;
  static fields = {
    _id: { primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING },
    completed: DataTypes.BOOLEAN,
  };
  static defaults = {
    completed: false,
  };
}
