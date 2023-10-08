import type { DataBase } from "../Database/Database.js";

export class ObjectStore<K> {
 constructor(public db: DataBase, public id: string) {}
 async get(id: string) {
  return await this.db.getData<K>(this.id, id);
 }
 async set(id: string, data: K) {
  return await this.db.setData<K>(this.id, id, data);
 }
 async delete(id: string) {
  return await this.db.removeData(this.id, id);
 }
}
