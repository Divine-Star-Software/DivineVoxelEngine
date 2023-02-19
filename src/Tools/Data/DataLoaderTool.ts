import type { LocationData } from "voxelspaces";
import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";

import { ThreadComm, CommBase } from "threadcomm";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { Distance3D } from "../../Math/Functions/Distance3d.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { DataHooks } from "../../Data/DataHooks.js";

export class DataLoaderTool extends LocationBoundTool {
 static columnDataTool = new ColumnDataTool();
 static isEnabled() {
  const comm = ThreadComm.getComm("data-loader");
  return Boolean(comm);
 }

 mode: "indexdb" | "server" | "both" = "server";
 _enabled = true;
 dataComm: CommBase;

 constructor() {
  super();
  const comm = ThreadComm.getComm("data-loader");
  if (!comm) {
   this._enabled = false;
   console.error("Data Loader comm must be set.");
  }
  this.dataComm = comm;
  this.mode = EngineSettings.settings.data.mode;

  DataHooks.settingsSynced.addToRun((data) => {
   this.mode = data.data.mode;
  });
 }

 isEnabled() {
  return this._enabled;
 }

 saveRegion(onDone?: Function) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "save-region",
   location.toString() + Date.now(),
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
   location.toString() + Date.now(),
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
   location.toString() + Date.now(),
   () => (onDone ? onDone() : false),
   location
  );
 }

 saveColumnIfNotStored(onDone?: (saved: boolean) => void) {
  const location = this.getLocation();

  if (!DataLoaderTool.columnDataTool.setLocation(location).loadIn())
   return onDone ? onDone(false) : false;
  if (DataLoaderTool.columnDataTool.isStored())
   return onDone ? onDone(false) : false;
  this.dataComm.runPromiseTasks(
   "save-column",
   location.toString() + Date.now(),
   () => {
    if (onDone) onDone(true);
   },
   location
  );

  return true;
 }

 loadIfExists(onDone?: (loaded: boolean) => void) {
  const location = <LocationData>[...this.getLocation()];

  this.columnExists((exists) => {
   if (exists) {
    this.setLocation(location).loadColumn(() => {
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
   location.toString() + Date.now(),
   () => {
    onDone ? onDone(true) : false;
   },
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

 unLoadColumn(onDone: (done: boolean) => void) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "unload-column",
   location.toString() + Date.now(),
   () => {
    onDone ? onDone(true) : false;
   },
   location
  );
 }

 _runTask(id: string, location: LocationData, onDone?: Function) {
  this.dataComm.runPromiseTasks(
   id,
   location.toString() + Date.now(),
   (data) => {
    onDone ? onDone(data) : false;
   },
   location
  );
 }

 columnExists(onDone?: (exists: boolean) => void) {
  const location = <LocationData>[...this.getLocation()];

  if (this.mode == "server") {
   if (!RegionHeaderRegister.get(location)) {
    this.loadRegionHeader(() => {
     this.setLocation(location).columnExists(onDone);
    });
    return;
   }
   const exists = RegionHeaderRegister.isStored(location);
   onDone ? onDone(exists >= 1 ? true : false) : false;
   return;
  }

  this.dataComm.runPromiseTasks(
   "column-exists",
   location.toString() + Date.now(),
   (data) => {
    onDone ? onDone(data) : false;
   },
   location
  );
 }

 loadRegionHeader(onDone?: (success: boolean) => void) {
  const location = this.getLocation();
  this.dataComm.runPromiseTasks(
   "load-region-header",
   location.toString() + Date.now(),
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
   location.toString() + Date.now(),
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

 unLoadAllOutsideRadius(
  radius: number,
  run: (column: ColumnDataTool) => boolean = (columntool) => true,
  onDone?: Function
 ) {
  const [dimension, sx, sy, sz] = this.location;
  const regions = WorldRegister.dimensions.get(dimension);
  if (!regions) return;
  let totalColumns = 0;
  for (const [key, region] of regions) {
   for (const [ckey, column] of region.columns) {
    DataLoaderTool.columnDataTool.setColumn(column);
    if (DataLoaderTool.columnDataTool.isPersistent()) continue;
    const [dimension, cx, cy, cz] =
     DataLoaderTool.columnDataTool.getLocationData();
    if (!run(DataLoaderTool.columnDataTool)) continue;
    const d = Distance3D(sx, sy, sz, cx, cy, cz);
    if (d > radius) {
     totalColumns++;
     this.setXYZ(cx, cy, cz).unLoadColumn(() => {
      totalColumns--;
     });
    }
   }
  }
  const inte = setInterval(() => {
   if (totalColumns == 0) {
    clearInterval(inte);
    if (onDone) onDone();
   }
  }, 1);
 }

 getAllUnStoredColumns(
  run: (dimension: string, x: number, y: number, z: number) => void
 ) {
  const [dimension, sx, sy, sz] = this.location;
  const regions = WorldRegister.dimensions.get(dimension);
  if (!regions) return;
  for (const [key, region] of regions) {
   for (const [ckey, column] of region.columns) {
    DataLoaderTool.columnDataTool.setColumn(column);
    if (DataLoaderTool.columnDataTool.isStored()) continue;
    const [dimension, cx, cy, cz] =
     DataLoaderTool.columnDataTool.getLocationData();
    run(dimension, cx, cy, cz);
   }
  }
 }
}
