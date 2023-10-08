import { ThreadComm } from "@divinestar/threads";
import { ZeneithDB } from "../ZeneithDB.js";

export class SecureIDBWrap {
 static dbs = new Map<string, IDBDatabase>();
 static clear(id: string) {
  const cdb = SecureIDBWrap.dbs.get(id)!;
  if (!cdb) return;
  cdb.close();
  SecureIDBWrap.dbs.delete(id)!;
 }
 connectionId = crypto.randomUUID();

 constructor(public id: string, public data: IDBDatabase) {
  if (SecureIDBWrap.dbs.get(id)) {
   const cdb = SecureIDBWrap.dbs.get(id)!;
   cdb.close();
  }
  SecureIDBWrap.dbs.set(this.id, data)!;

  ZeneithDB.core.dataBase.setData("meta", `${this.connectionId}-${id}`, {
   time: new Date().toLocaleTimeString(),
   dataBaseId: id,
   thread: {
    name: ThreadComm.threadName,
    number: ThreadComm.threadNumber,
    parent: ThreadComm.parent.name,
   },
  });
 }

 get() {
  return this.data;
 }
 null() {
  SecureIDBWrap.clear(this.id);

  ZeneithDB.core.dataBase.removeData("meta", `${this.connectionId}-${this.id}`);
 }
}
