import { DBO } from "divine-binary-object/index.js";
import {
 GetRichDataTasks,
 SetRichColumnTasks,
 SetRichDataTasks,
} from "Meta/Tasks/Tasks.types";
import { CommBase, ThreadComm } from "threadcomm";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { LocationData } from "voxelspaces";

export class RichDataTool extends LocationBoundTool {
 segment = "voxels";

 comm: CommBase;
 _enabled = false;

 constructor() {
  super();
  this.comm = ThreadComm.getComm("rich-world");
  if (!this.comm || !this.comm.isPortSet()) {
   this._enabled = false;
   if (this.comm) {
    this.comm.onSetPort(() => {
     this._enabled = true;
    });
   }
   return;
  } 
  if(this.comm.isPortSet()) {
    this._enabled = true;
  }
 }

 isEnabled() {
  return this._enabled;
 }

 setSegment(segment: string) {
  this.segment = segment;
  return this;
 }

 columnHasData(check: (hasData: boolean) => void) {
  this.comm.runPromiseTasks<LocationData>(
   "has-data",
   this.location,
   [],
   (hadData) => {
    check(hadData);
   }
  );
 }

 columnHasDataAsync() {
  return new Promise<boolean>((resolve) => {
   this.columnHasData((hasData) => {
    resolve(hasData);
   });
  });
 }

 getData<T = any>(onDone: (data: T | false) => void) {
  this.comm.runPromiseTasks<GetRichDataTasks>(
   "get-data",
   [this.location, this.segment],
   [],
   (data: ArrayBuffer) => {
    if (!data) return onDone(false);
    onDone(DBO.bufferToObject(data));
   }
  );
 }

 getDataAsync<T = any>(): Promise<T | false> {
  return new Promise((resolve) => {
   this.getData<T>((data) => {
    resolve(data);
   });
  });
 }

 setData<T = any>(data: T, onDone = (data: boolean) => {}) {
  const buffer = DBO.objectToBuffer(data);
  this.comm.runPromiseTasks<SetRichDataTasks>(
   "set-data",
   [this.location, this.segment, buffer],
   [buffer],
   (success) => {
    onDone(success);
   }
  );
 }

 setDataAsync<T = any>(data: T) {
  return new Promise<boolean>((resolve) => {
   this.setData<T>(data, (updated) => {
    resolve(updated);
   });
  });
 }

 removeData(onDone: (removed: boolean) => void) {
  this.comm.runPromiseTasks<GetRichDataTasks>(
   "remove-data",
   [this.location, this.segment],
   [],
   (removed: boolean) => {
    onDone(removed);
   }
  );
 }

 removeDataAsync<T = any>() {
  return new Promise<boolean>((resolve) => {
   this.removeData((removed) => {
    resolve(removed);
   });
  });
 }

 removeColumn(onDone: (removed: boolean) => void) {
  this.comm.runPromiseTasks<LocationData>(
   "remove-column",
   this.location,
   [],
   (removed: boolean) => {
    onDone(removed);
   }
  );
 }

 removeColumnAsync<T = any>() {
  return new Promise<boolean>((resolve) => {
   this.removeData((removed) => {
    resolve(removed);
   });
  });
 }

 getColumn(onDone: (data: ArrayBuffer) => void) {
  this.comm.runPromiseTasks<LocationData>(
   "get-column",
   this.location,
   [],
   (data: ArrayBuffer) => {
    onDone(data);
   }
  );
 }

 getColumnAsync(): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
   this.getColumn((data) => {
    resolve(data);
   });
  });
 }

 setColumn(column: ArrayBuffer, onDone: (success: boolean) => void) {
  this.comm.runPromiseTasks<SetRichColumnTasks>(
   "set-column",
   [this.location, column],
   [],
   (success: boolean) => {
    onDone(success);
   }
  );
 }

 setColumnAsync(column: ArrayBuffer): Promise<boolean> {
  return new Promise((resolve) => {
   this.setColumn(column, (success) => {
    resolve(success);
   });
  });
 }

 releaeAllData() {
  this.comm.runTasks("release-all-data", [], []);
 }
}
