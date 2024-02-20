import type { ZeneithDatabaseCreationData } from "../Meta/Database/Database.types.js";
import type { ZeneithDatabaseSchema } from "../Meta/Zeneith/Database.schema.js";

import { DataBase } from "../Database/Database.js";
import { ZeneithUtil } from "../ZeneithUtil.js";
import { RegisterZeneithTasks } from "./ZeneithTasks.js";
import { CommBase, CommManager } from "@divinestar/threads";

RegisterZeneithTasks();
export const ZeneithDBCore = {
 dataBase: <DataBase>{},
 __version: 1,
 loadedDatabases: <Record<string, DataBase>>{},

 util: ZeneithUtil,

 async initialize() {
  this.dataBase = new DataBase(
   {
    databaseName: "ZeneithDB",
    collections: [
     {
      name: "meta",
      schema: [],
     },
     {
      name: "collections",
      schema: [],
     },
     {
      name: "databases",
      schema: [],
     },
    ],
   },
   true
  );

  const version = await this.dataBase.getDatabaeVersion();
  if (version != this.__version + 1) {
   console.warn("ZeneithDB is being created.");
   await this.dataBase.__create();
  }
  await this.dataBase.open();
  await this.dataBase.removeAllData("meta");
 },

 async createDataBase(data: ZeneithDatabaseCreationData) {
  if (this.loadedDatabases[data.databaseName])
   return this.loadedDatabases[data.databaseName];
  const databaseCheck = await this.dataBase.getData(
   "databases",
   data.databaseName
  );
  if (databaseCheck) {
   throw new Error(
    `The database ${data.databaseName} already exists. Use 'updateDatabase' to update the database instead.`
   );
  }
  await this.dataBase.setData<ZeneithDatabaseSchema>(
   "databases",
   data.databaseName,
   {
    collectionCount: data.collections.length,
    creationData: data,
   }
  );
  const database = new DataBase(data);
  this.loadedDatabases[data.databaseName] = database;
  await database.__create();
  return database;
 },

 async updateDatBaseData(data: ZeneithDatabaseCreationData) {
  await this.dataBase.setData<ZeneithDatabaseSchema>(
   "databases",
   data.databaseName,
   {
    collectionCount: data.collections.length,
    creationData: data,
   }
  );
 },

 async getDataBase(dataBasename: string) {
  if (this.loadedDatabases[dataBasename]) {
   return this.loadedDatabases[dataBasename];
  }

  await this.dataBase.open();

  const dataBaseCheck = await this.dataBase.getData<ZeneithDatabaseSchema>(
   "databases",
   dataBasename
  );

  if (!dataBaseCheck) {
   throw new Error(
    `The database ${dataBasename} does not exists inside of ZeneithDB.`
   );
  }

  const database = new DataBase(dataBaseCheck.creationData);

  this.loadedDatabases[dataBasename] = database;
  return database;
 },

 async dataBaseExist(dataBasename: string): Promise<boolean> {
  const check = await this.dataBase.getData("databases", dataBasename);
  if (!check) {
   return false;
  } else {
   return true;
  }
 },

 async deleteDataBase(dataBasename: string) {
  delete this.loadedDatabases[dataBasename];
  await this.dataBase.open();
  const check = await this.dataBase.getData<ZeneithDatabaseSchema>(
   "databases",
   dataBasename
  );
  if (!check) {
   return false;
  }
  this.dataBase.removeData("databases", dataBasename);
  for (const collection of check.creationData.collections) {
   await this.dataBase.removeData(
    "collections",
    `${dataBasename}-${collection.name}`
   );
  }
  indexedDB.deleteDatabase(dataBasename);
 },

 tasks: {
  close(comm: CommBase | CommManager, id: string) {
   return new Promise(async (resolve, reject) => {
   
    if (comm instanceof CommBase) {
     return comm.runPromiseTasks("zdb-close-database", id, [], () => {
      resolve(true);
     });
    }
    if (comm instanceof CommManager) {
     await Promise.all(
      comm.__comms.map(
       (_) =>
        new Promise((r) => {
         _.runPromiseTasks("zdb-close-database", id, [], () => {
          r(true);
         });
        })
      )
     );
     return resolve(true);
    }
    reject(false);
   });
  },
  open(comm: CommBase | CommManager, id: string) {
   return new Promise(async (resolve, reject) => {
    if (comm instanceof CommBase) {
     return comm.runPromiseTasks("zdb-open-database", id, [], () => {
      resolve(true);
     });
    }
    if (comm instanceof CommManager) {
     await Promise.all(
      comm.__comms.map(
       (_) =>
        new Promise((r) => {
         _.runPromiseTasks("zdb-open-database", id, [], () => {
          r(true);
         });
        })
      )
     );
     return resolve(true);
    }
    reject(false);
   });
  },
 },
};
