import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
import { CommBase } from "../../Libs/ThreadComm/Comm/Comm.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataToolWorldBound } from "./Classes/DataToolBase.js";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";

export class DataLoaderTool extends DataToolWorldBound {
 static columnDataTool = new ColumnDataTool();
 static isEnabled() {
  const comm = ThreadComm.getComm("data-loader");
  return Boolean(comm);
 }

 dataComm: CommBase;

 constructor() {
  super();
  const comm = ThreadComm.getComm("data-loader");
  if (!comm) {
   throw new Error("Data Loader comm must be set.");
  }
  this.dataComm = comm;
 }

 saveRegion(onDone?: Function) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "save-region",
   location.toString(),
   () => (onDone ? onDone() : false),
   location
  );
 }

 saveRegionAsync() {
  return new Promise((resolve) => {
   this.saveRegion(() => {
    resolve(true);
   });
  });
 }

 loadRegion(onDone?: Function) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "load-region",
   location.toString(),
   () => (onDone ? onDone() : false),
   location
  );
 }

 loadRegionAsync() {
  return new Promise((resolve) => {
   this.loadRegion(() => {
    resolve(true);
   });
  });
 }

 saveColumn(onDone?: Function) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "save-column",
   location.toString(),
   () => (onDone ? onDone() : false),
   location
  );
 }

 saveColumnIfNotStored(onDone?: (saved: boolean) => void) {
  const location = this.getLocation();

  if (!DataLoaderTool.columnDataTool.loadInAt(location)) return false;
  if (DataLoaderTool.columnDataTool.isStored()) return false;
  this.dataComm.runPromiseTasks(
   "save-column",
   location.toString(),
   () => (onDone ? onDone(true) : false),
   location
  );

  return true;
 }

 loadIfExists(onDone?: (loaded: boolean) => void) {
  const location = <LocationData>[...this.getLocation()];

  this.columnExists((exists) => {
   if (exists) {
    this.setLocation(location);
    this.loadColumn(() => {
     onDone ? onDone(true) : false;
    });
    return;
   }
   onDone ? onDone(false) : false;
  });
 }

 saveColumnAsync() {
  return new Promise((resolve) => {
   this.saveColumn(() => {
    resolve(true);
   });
  });
 }

 loadColumn(onDone?: Function) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "load-column",
   location.toString(),
   () => (onDone ? onDone() : false),
   location
  );
 }

 loadColumnAsync() {
  return new Promise((resolve) => {
   this.loadColumn(() => {
    resolve(true);
   });
  });
 }

 _runTask(id: string, location: LocationData, onDone?: Function) {
  this.dataComm.runPromiseTasks(
   id,
   location.toString(),
   (data) => {
    onDone ? onDone(data) : false;
   },
   location
  );
 }

 columnExists(onDone?: (exists: boolean) => void) {
  const location: LocationData = [...this.getLocation()];
  if (!RegionHeaderRegister.get(location)) {
   this.loadRegionHeader(() => {
    this.setLocation(location).columnExists(onDone);
   });
   return;
  }
  const exists = RegionHeaderRegister.isStored(location);
  onDone ? onDone(exists >= 1 ? true : false) : false;
 }

 loadRegionHeader(onDone: (success: boolean) => void) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "load-region-header",
   location.toString(),
   (data) => {
    onDone ? onDone(data) : false;
   },
   location
  );
 }

 loadRegionHeaderAsync() {
  return new Promise((resolve) => {
   this.loadRegionHeader((anaswer) => {
    resolve(anaswer);
   });
  });
 }

 columnExistsAsync(): Promise<boolean> {
  return new Promise((resolve) => {
   this.columnExists((anaswer) => {
    resolve(anaswer);
   });
  });
 }

 columnTimestamp(onDone?: (timestamp: number) => void) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "column-timestamp",
   location.toString(),
   (data) => {
    onDone ? onDone(data) : false;
   },
   location
  );
 }

 columnTimestampAsync(): Promise<number> {
  return new Promise((resolve) => {
   this.columnTimestamp((timeStamp) => {
    resolve(timeStamp);
   });
  });
 }
}
