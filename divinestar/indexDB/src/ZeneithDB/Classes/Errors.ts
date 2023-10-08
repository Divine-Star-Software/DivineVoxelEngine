import { DataBase } from "ZeneithDB/Database/Database.js";
import { ZeneithDB } from "../ZeneithDB.js";
import { ThreadComm } from "@divinestar/threads";

export class ZeneithError extends Error {
 constructor(
  message: string,
  data: {
   blocked?: boolean;
   collection?: string;
   dataBaseID?: string;
   event?: any;
   dataBase?: any;
   functionName?: string;
  }
 ) {
  super();
  console.group();
  console.error(
   `[ZDB ERROR: ${new Date().toLocaleTimeString()}]
   [THREAD: name: ${ThreadComm.threadName} number: ${
    ThreadComm.threadName
   } parent : ${ThreadComm.parent.name}]
   ${message}`,
   data
  );
  console.table(ZeneithDB.core.loadedDatabases);
  console.groupEnd();
 }
}
