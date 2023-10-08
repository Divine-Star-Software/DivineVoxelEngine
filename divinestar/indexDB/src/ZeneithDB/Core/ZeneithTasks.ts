import { ThreadComm } from "@divinestar/threads/";
import { ZeneithDBCore } from "./ZeneithDBCore.js";

export function RegisterZeneithTasks() {
 ThreadComm.registerTasks<string>(
  "zdb-close-database",
  async (dbId, onDone) => {
   const db = ZeneithDBCore.loadedDatabases[dbId];
   if (!db) return;
   await db.waitTillTranscationDone();
   db.close();
   if (onDone) onDone();
  },
  "deferred"
 );
 ThreadComm.registerTasks<string>(
  "zdb-open-database",
  async (dbId, onDone) => {
   const db = ZeneithDBCore.loadedDatabases[dbId];
   if (!db) return;
   await db.waitTillTranscationDone();
   db.open();
   if (onDone) onDone();
  },
  "deferred"
 );
}
