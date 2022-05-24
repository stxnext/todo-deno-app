import { Database, MongoDBConnector } from "denodb";
import Models from "../../domain/todo/models/index.ts";
// import { DatabaseMigrations } from "./migrations.ts";

export class DatabaseConnector {
  public async connect(): Promise<Database> {
    const connection = new MongoDBConnector({
      uri: Deno.env.get("MONGODB_URL") as string,
      database: Deno.env.get("DATABASE") as string,
    });
    const db = new Database({ connector: connection, debug: false });
    await this.linkModels(db);
    return db;
  }

  private async linkModels(db: Database): Promise<Database> {
    await db.link(Models);
    return db;
  }
  private async syncDb(db: Database): Promise<Database> {
    await db.sync();
    return db;
  }
}
