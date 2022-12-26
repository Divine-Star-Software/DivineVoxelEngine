import { CommBase } from "../../Libs/ThreadComm/Comm/Comm.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataToolWorldBound } from "./Classes/DataToolBase.js";

export class DataLoaderTool extends DataToolWorldBound {
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
   JSON.stringify(location),
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
   JSON.stringify(location),
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
}


