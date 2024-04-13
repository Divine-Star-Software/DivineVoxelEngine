import type { LocationData } from "@divinevoxel/core/Math";
import { RegionHeaderRegister } from "../../../Data/RegionHeaderRegister.js";

import { ThreadComm, CommBase } from "@divinestar/threads/";
import { ColumnDataTool } from "../Data/WorldData/ColumnDataTool.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { Distance3D } from "@divinevoxel/core/Math/Functions/Distance3d.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { DataHooks } from "../../../Data/DataHooks.js";

import { LoaderRegister } from "./LoaderRegister.js";
import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";
import { WorldLock } from "../../../Contexts/World/Lock/WorldLock.js";

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
      console.warn("Data Loader comm must be set to use the data loader tool.");
    } else {
      if (!comm.isPortSet()) {
        this._enabled = false;
        comm.onSetPort(() => (this._enabled = true));
      }
    }
    this.dataComm = comm;
    this.mode = EngineSettings.settings.data.mode;

    LoaderRegister.$INIT(this.dataComm);

    DataHooks.settingsSynced.subscribe("data-loader", (data) => {
      this.mode = data.data.mode;
    });
  }
  _runTask(id: string, location: LocationData, onDone?: Function) {
    this.dataComm.runPromiseTasks(id, location, [], (data) => {
      onDone ? onDone(data) : false;
    });
  }

  isEnabled() {
    return this._enabled;
  }

  saveRegion(onDone?: Function) {
    const location = this.getLocation();
    this.dataComm.runPromiseTasks("save-region", location, [], () =>
      onDone ? onDone() : false
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
    this.dataComm.runPromiseTasks("load-region", location, [], () =>
      onDone ? onDone() : false
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
    this.dataComm.runPromiseTasks("save-column", location, [], () =>
      onDone ? onDone() : false
    );
  }

  saveColumnIfNotStored(onDone?: (saved: boolean) => void) {
    const location = this.getLocation();

    if (!DataLoaderTool.columnDataTool.setLocation(location).loadIn())
      return onDone ? onDone(false) : false;
    if (DataLoaderTool.columnDataTool.isStored())
      return onDone ? onDone(false) : false;
    this.dataComm.runPromiseTasks("save-column", location, [], () => {
      if (onDone) onDone(true);
    });

    return true;
  }

  loadIfExists(onDone?: (loaded: boolean) => void) {
    if (!this._enabled) return onDone ? onDone(true) : false;
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
    LoaderRegister.addToLoad(this.getLocation(), () => {
      onDone ? onDone(true) : false;
    });
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
    if (WorldLock.isLocked(location) || !WorldRegister.column.get(location))
      return onDone ? onDone(false) : false;
    this.dataComm.runPromiseTasks("unload-column", location, [], () => {
      onDone ? onDone(true) : false;
    });
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

    this.dataComm.runPromiseTasks("column-exists", location, [], (data) => {
      onDone ? onDone(data) : false;
    });
  }

  loadRegionHeader(onDone?: (success: boolean) => void) {
    const location = this.getLocation();
    this.dataComm.runPromiseTasks(
      "load-region-header",
      location,
      [],
      (data) => {
        onDone ? onDone(data) : false;
      }
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
    this.dataComm.runPromiseTasks("column-timestamp", location, [], (data) => {
      onDone ? onDone(data) : false;
    });
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
    const dim = WorldRegister.dimensions.get(dimension);
    if (!dim) return;
    let totalColumns = 0;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
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
    const inte = new SafeInterval().setInterval(1).setOnRun(() => {
      if (totalColumns == 0) {
        inte.stop();
        if (onDone) onDone();
      }
    });
    inte.start();
  }
  unLoadAllColumnsAsync() {
    return new Promise((resolve) => {
      this.unLoadAllColumns(() => {
        resolve(true);
      });
    });
  }
  unLoadAllColumns(onDone?: Function) {
    const [dimension, sx, sy, sz] = this.location;
    const dim = WorldRegister.dimensions.get(dimension);
    if (!dim) return;
    let totalColumns = 0;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
        DataLoaderTool.columnDataTool.setColumn(column);
        const [dimension, cx, cy, cz] =
          DataLoaderTool.columnDataTool.getLocationData();
        totalColumns++;
        this.setXYZ(cx, cy, cz).unLoadColumn(() => {
          totalColumns--;
        });
      }
    }

    const inte = new SafeInterval().setInterval(1).setOnRun(() => {
      if (totalColumns == 0) {
        inte.stop();
        if (onDone) onDone();
      }
    });
    inte.start();
  }

  allColumns(run: (column: ColumnDataTool) => void) {
    const [dimension, sx, sy, sz] = this.location;
    const dim = WorldRegister.dimensions.get(dimension);
    if (!dim) return;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
        DataLoaderTool.columnDataTool.setColumn(column);
        run(DataLoaderTool.columnDataTool);
      }
    }
  }

  getAllUnStoredColumns(
    run: (dimension: string, x: number, y: number, z: number) => void
  ) {
    const [dimension, sx, sy, sz] = this.location;
    const dim = WorldRegister.dimensions.get(dimension);
    if (!dim) return;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
        DataLoaderTool.columnDataTool.setColumn(column);
        if (DataLoaderTool.columnDataTool.isStored()) continue;
        const [dimension, cx, cy, cz] =
          DataLoaderTool.columnDataTool.getLocationData();
        run(dimension, cx, cy, cz);
      }
    }
  }
}
