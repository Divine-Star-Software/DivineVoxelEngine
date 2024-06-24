import { DataBase, IndexDB } from "@amodx/indexdb/";
import { WorldDataBase } from "./WorldDataBase";

export class WorldDataBaseManager {
  static async init() {
    await IndexDB.init();
  }
  static async getWorldDataBase(dbName: string, dimension: string = "main") {
    let db: DataBase;
    const existanceCheck = await IndexDB.databaseExists(dbName);
    if (!existanceCheck) {
      db = await IndexDB.createDatabase({
        databaseName: dbName,
        objectStores: [
          {
            name: "world-meta",
            schema: [],
          },
        ],
      });
      return new WorldDataBase(db);
    } else {
      db = await IndexDB.getDatabase(dbName);
      return new WorldDataBase(db);
    }
  }
  static async deleteWorldDataBase(dbName: string) {
    await IndexDB.deleteDatabase(dbName);
  }
}
