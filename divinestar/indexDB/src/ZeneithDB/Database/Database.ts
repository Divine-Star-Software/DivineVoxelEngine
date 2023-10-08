import { ZeneithDBCore } from "../Core/ZeneithDBCore.js";
import type {
 ZeneithCollectionData,
 ZeneithDatabaseCreationData,
} from "../Meta/Database/Database.types";
import type { ZeneithSchema } from "../Meta/Database/Schema.types";
import { ZeneithUtil } from "../ZeneithUtil.js";
import { ObjectStore } from "../Store/ObjectStore.js";
import { ZeneithError } from "../Classes/Errors.js";
import { SecureIDBWrap } from "../Classes/SecureIDBWrap.js";

export class DataBase {
 dataBaseName = "";
 util = ZeneithUtil;
 opened = false;
 __db = <SecureIDBWrap | null>null;

 states = {
  dataUpdating: false,
  collectionUpdate: false,
 };

 get db() {
  return this.__db;
 }
 set db(db: SecureIDBWrap | null) {
  if (this.__db != null && db != null) {
   throw new ZeneithError("Overrode active database.", {
    dataBaseID: this.dataBaseName,
    dataBase: this,
   });
  }
  this.__db = db;
 }
 _beingUpgrded = false;
 _openeed: number[] = [];
 _closed: number[] = [];

 _activeTransaction: IDBTransaction | null = null;

 constructor(
  public creationData: ZeneithDatabaseCreationData,
  public outsideZeneith: boolean = false
 ) {
  this.dataBaseName = this.creationData.databaseName;
 }

 __open(version?: number) {
  this._openeed.push(performance.now());
  if (this.db) this.close();
  this.db = null;
  SecureIDBWrap.clear(this.dataBaseName);
  return indexedDB.open(this.dataBaseName, version);
 }

 isOpen() {
  return this.db !== null;
 }

 getUUID() {
  return ZeneithUtil.getUUID();
 }

 open(): Promise<boolean> | boolean {
  if (this._beingUpgrded) {
   throw new ZeneithError("Tried opening while updating", {
    dataBase: this,
    dataBaseID: this.dataBaseName,
    functionName: this.open.name,
   });
  }

  if (this.isOpen()) return true;

  const prom: Promise<boolean> = new Promise((resolve, reject) => {
   const request = this.__open();
   request.onerror = (event) => {
    reject(false);
    throw new ZeneithError("Opening a database failed.", {
     dataBaseID: this.dataBaseName,
     event: event,
    });
   };
   request.onblocked = (event) => {
    reject(false);
    throw new ZeneithError("Opening a database was blocked", {
     blocked: true,
     dataBaseID: this.dataBaseName,
     event: event,
    });
   };
   request.onsuccess = (event) => {
    this.db = new SecureIDBWrap(this.dataBaseName, request.result);
    this.opened = true;
    resolve(true);
   };
  });
  return prom;
 }

 close(): boolean {
  this._closed.push(performance.now());
  if (!this.db) {
   return false;
  }
  this.opened = false;
  this.db.null();

  this.db = null;
  return true;
 }

 _openAtVersion(version = 1) {
  const prom: Promise<boolean> = new Promise(async (resolve, reject) => {
   const request = this.__open(version);

   request.onerror = (event) => {
    reject(false);
    throw new ZeneithError("Opening a database failed.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: this._openAtVersion.name,
    });
   };

   request.onblocked = (event) => {
    reject(false);
    throw new ZeneithError("Opening a database was blocked", {
     blocked: true,
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: this._openAtVersion.name,
    });
   };

   request.onsuccess = (event) => {
    this.db = new SecureIDBWrap(this.dataBaseName, request.result);
    this.opened = true;
    resolve(true);
   };
  });
  return prom;
 }

 async __create() {
  return await this.forceUpdate(undefined, true);
 }

 async forceUpdate(removeCollections?: string[], newDB = false) {
  let version = newDB ? 1 : await this.getDatabaeVersion();
  if (this._beingUpgrded) {
   throw new ZeneithError("Tried updating while already updating", {
    dataBase: this,
    dataBaseID: this.dataBaseName,
    functionName: this.forceUpdate.name,
   });
  }
  this._beingUpgrded = true;
  this.close();
  return new Promise((resolve, reject) => {
   const request = this.__open(version + 1);
   request.onerror = (event) => {
    this._beingUpgrded = false;
    reject(false);
    throw new ZeneithError("Force update ran into an error.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: this.forceUpdate.name,
    });
   };
   request.onblocked = (event) => {
    this._beingUpgrded = false;
    reject(false);
    throw new ZeneithError("Force update was blocked.", {
     blocked: true,
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: this.forceUpdate.name,
    });
   };

   request.onupgradeneeded = (event) => {
    const db = new SecureIDBWrap(this.dataBaseName, request.result);
    this.db = db;
    if (!this.outsideZeneith) {
     ZeneithDBCore.updateDatBaseData(this.creationData);
    }
    if (removeCollections) {
     for (const collectionName of removeCollections) {
      db.get().deleteObjectStore(collectionName);
     }
    }
    for (const collectionData of this.creationData.collections) {
     if (db.get().objectStoreNames.contains(collectionData.name)) continue;
     this._processCollectionScehma(
      db.get().createObjectStore(collectionData.name),
      collectionData.schema
     );
    }
   };

   request.onsuccess = (event) => {
    if (!this.db)
     this.db = new SecureIDBWrap(this.dataBaseName, request.result);
    this.close();
    resolve(true);
    this._beingUpgrded = false;
   };
  });
 }

 _processCollectionScehma(collection: IDBObjectStore, schema: ZeneithSchema) {
  this.__traverseColletionScehma(collection, schema);
 }

 __traverseColletionScehma(collection: IDBObjectStore, schema: ZeneithSchema) {
  for (const node of schema) {
   if (Array.isArray(node)) {
    this.__traverseColletionScehma(collection, node as any);
    continue;
   }
   if (node.index) {
    collection.createIndex(node.name, node.name, { unique: node.isUnique });
   }
   if (node.children) {
    this.__traverseColletionScehma(collection, node.children as any);
   }
  }
 }

 async getCollection<T = any>(id: string) {
  if (!this.isOpen()) await this.open();
  if (!this.db?.get().objectStoreNames.contains(id)) {
   throw new Error(
    `${id} does not exists in database ${this.creationData.databaseName}`
   );
  }
  return new ObjectStore<T>(this, id);
 }

 async addCollection(data: ZeneithCollectionData[]) {
  if (this._beingUpgrded) {
   throw new ZeneithError("Tried adding collections while updating", {
    dataBase: this,
    dataBaseID: this.dataBaseName,
    functionName: this.addCollection.name,
   });
  }
  try {
   if (!this.isOpen()) await this.open();
   let count = 0;
   for (const store of data) {
    if (this.db!.get().objectStoreNames.contains(store.name)) continue;
    this.creationData.collections.push(store);
    count++;
   }
   this.close();
   if (count) await this.forceUpdate();
   return true;
  } catch (error: any) {
   console.error(error);
   return false;
  }
 }

 async removeCollection(collectionName: string | string[]) {
  if (this._beingUpgrded) {
   throw new ZeneithError("Tried removing collections while updating", {
    dataBase: this,
    dataBaseID: this.dataBaseName,
    functionName: this.removeCollection.name,
   });
  }
  try {
   let deleteCollections: string[] = [];
   if (typeof collectionName == "string") {
    deleteCollections.push(collectionName);
   } else {
    deleteCollections.push(...collectionName);
   }
   const collections: any[] = [];
   for (const collection of this.creationData.collections) {
    if (!deleteCollections.includes(collection.name)) {
     collections.push(collection);
    }
   }
   this.creationData.collections = collections;

   await this.forceUpdate(deleteCollections);
   return true;
  } catch (error: any) {
   console.log(
    `Failed making a new collection with the name ${collectionName}`
   );
   console.error(error);
   return false;
  }
 }

 getDatabaeVersion() {
  if (this.db) return this.db.get().version;
  const prom: Promise<number> = new Promise((resolve, reject) => {
   const request = this.__open();
   request.onsuccess = (event) => {
    const version = request.result.version;
    this.db = new SecureIDBWrap(this.dataBaseName, request.result);
    this.close();
    resolve(version);
   };
   request.onerror = (event) => {
    reject(false);
    throw new ZeneithError("Get version ran into an error.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: this.getDatabaeVersion.name,
    });
   };
   request.onblocked = (event) => {
    this._beingUpgrded = false;
    reject(false);
    this.getDatabaeVersion.name;
    throw new ZeneithError("Get version was blocked.", {
     blocked: true,
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: this.getDatabaeVersion.name,
    });
   };
  });
  return prom;
 }

 doesCollectionExist(collectionName: string): boolean {
  if (!this.db) {
   throw new Error(`Database ${this.dataBaseName} is not opened.`);
  }
  if (this.db.get().objectStoreNames.contains(collectionName)) {
   return true;
  } else {
   return false;
  }
 }

 waitTillTranscationDone() {
  return new Promise((resolve) => {
   const inte = setInterval(() => {
    if (this._activeTransaction) return;
    clearInterval(inte);
    resolve(true);
   }, 10);
  });
 }
 waitTillUpdatingDone() {
  return new Promise((resolve) => {
   const inte = setInterval(() => {
    if (this._beingUpgrded) return;
    clearInterval(inte);
    resolve(true);
   }, 10);
  });
 }

 getData<T>(collectionName: string, key: string): Promise<T | false> {
  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction([collectionName], "readonly");
   const objectStore = transaction.objectStore(collectionName);
   this._activeTransaction = transaction;
   const request: IDBRequest<T> = objectStore.get(key);
   request.onerror = (event) => {
    reject(false);
    this._activeTransaction = null;
    throw new ZeneithError("Error while getting data.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "getData",
    });
   };

   transaction.oncomplete = () => {
    this._activeTransaction = null;
    if (!request.result) {
     resolve(false);
    } else {
     resolve(request.result);
    }
   };
  });
 }

 getAllData<T>(collectionName: string): Promise<T[] | false> {
  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction([collectionName], "readonly");
   const request: IDBRequest<T[]> = transaction
    .objectStore(collectionName)
    .getAll();
   this._activeTransaction = transaction;
   request.onerror = (event) => {
    reject(false);
    throw new ZeneithError("Error while getting all data.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "getAllData",
    });
   };
   transaction.oncomplete = () => {
    this._activeTransaction = null;
    if (!request.result) {
     resolve(false);
    } else {
     resolve(request.result);
    }
   };
  });
 }

 getAllKeys(collectionName: string): Promise<IDBValidKey[] | false> {
  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction([collectionName], "readonly");
   const request: IDBRequest<IDBValidKey[]> = transaction
    .objectStore(collectionName)
    .getAllKeys();
   this._activeTransaction = transaction;
   request.onerror = (event) => {
    reject(false);
    throw new ZeneithError("Error while getting all keys.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "getAllKeys",
    });
   };
   transaction.oncomplete = () => {
    this._activeTransaction = null;
    if (!request.result) {
     resolve(false);
    } else {
     resolve(request.result);
    }
   };
  });
 }

 removeData(collectionName: string, key: string): Promise<boolean> {
  this.states.dataUpdating = true;
  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction(
    [collectionName],
    "readwrite"
   );
   const request = transaction.objectStore(collectionName).delete(key);
   this._activeTransaction = transaction;

   request.onerror = (event) => {
    reject(false);
    this._activeTransaction = null;
    throw new ZeneithError("Error while removing data.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "removeData",
    });
   };
   transaction.oncomplete = () => {
    resolve(true);
    this._activeTransaction = null;
   };
  });
 }

 removeAllData(collectionName: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction(
    [collectionName],
    "readwrite"
   );
   const request = transaction.objectStore(collectionName).clear();
   this._activeTransaction = transaction;

   request.onerror = (event) => {
    this._activeTransaction = null;
    reject(false);
    throw new ZeneithError("Error while removing all data.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "removeAllData",
    });
   };
   transaction.oncomplete = () => {
    resolve(true);
    this._activeTransaction = null;
   };
  });
 }

 setData<T>(collectionName: string, key: string, setData: T): Promise<boolean> {
  this.states.dataUpdating = true;
  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction(
    [collectionName],
    "readwrite"
   );
   const request = transaction.objectStore(collectionName).put(setData, key);
   this._activeTransaction = transaction;

   request.onerror = (event) => {
    reject(false);
    this._activeTransaction = null;
    throw new ZeneithError("Error while setting data.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "setData",
    });
   };
   transaction.oncomplete = () => {
    resolve(true);
    this._activeTransaction = null;
   };
  });
 }

 updateData<T>(
  collectionName: string,
  key: string,
  updateFunction: (data: T) => T
 ): Promise<boolean> {
  this.states.dataUpdating = true;

  return new Promise(async (resolve, reject) => {
   await this.waitTillUpdatingDone();
   await this.waitTillTranscationDone();
   if (!this.isOpen()) await this.open();
   const transaction = this.db!.get().transaction(
    [collectionName],
    "readwrite"
   );
   const objectStore = transaction.objectStore(collectionName);
   const request = objectStore.get(key);
   this._activeTransaction = transaction;

   request.onerror = (event) => {
    reject(false);
    this._activeTransaction = null;
    throw new ZeneithError("Error while updating data.", {
     dataBaseID: this.dataBaseName,
     event: event,
     dataBase: this,
     functionName: "updateData",
    });
   };
   request.onsuccess = (event) => {
    this._activeTransaction = null;
    //@ts-ignore
    const data = event.target.result;
    if (!data) {
     resolve(false);
     transaction.commit();
     return;
    }

    const newData = updateFunction(data);
    const requestUpdate = objectStore.put(newData);
    requestUpdate.onerror = (event) => {
     this._activeTransaction = null;
     reject(false);
     throw new ZeneithError("Error while updating data.", {
      dataBaseID: this.dataBaseName,
      event: event,
      dataBase: this,
      functionName: "updateData",
     });
    };
    transaction.oncomplete = () => {
     this._activeTransaction = null;
     resolve(true);
    };
   };
  });
 }
}
