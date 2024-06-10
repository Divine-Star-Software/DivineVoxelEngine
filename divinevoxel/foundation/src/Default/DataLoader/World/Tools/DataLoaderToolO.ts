import type { LocationData } from "@divinevoxel/core/Math";
import { RegionHeaderRegister } from "../../../../Data/RegionHeaderRegister.js";

import { ThreadComm, CommBase, CommManager } from "@divinestar/threads/";
import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";
import { Distance3D } from "@divinevoxel/core/Math/Functions/Distance3d.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { DataHooks } from "../../../../Data/DataHooks.js";

import { LoaderRegister } from "./LoaderRegister.js";
import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";
import { SafePromise } from "@divinestar/utils/Promises/SafePromise.js";
import { WorldLock } from "../../../../Contexts/World/Lock/WorldLock.js";
import { DVEFWorldCore } from "../../../../Contexts/World/DVEFWorldCore.js";

export class DataLoaderTool extends LocationBoundTool {
  static columnDataTool = new ColumnDataTool();
  static isEnabled() {
    return true;
  }

  mode: "indexdb" | "server" | "both" = "server";
  _enabled = true;
  dataComm: CommManager;

  constructor() {
    super();
    this.dataComm = DVEFWorldCore.instance.threads.constructors;

    this.mode = EngineSettings.settings.data.mode as any

    LoaderRegister.$INIT(this.dataComm);

    DataHooks.settingsSynced.subscribe("data-loader", (data) => {
      this.mode = data.data.mode as any
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
    return new SafePromise("saveRegionAsync", (resolve) => {
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
    return new SafePromise("loadRegionAsync", (resolve) => {
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
    return new SafePromise("saveColumnAsync", (resolve) => {
      this.saveColumn(() => {
        resolve(true);
      });
    }).run();
  }

  loadColumn(onDone?: Function) {
    LoaderRegister.addToLoad(this.getLocation(), () => {
      onDone ? onDone(true) : false;
    });
  }

  loadColumnAsync() {
    return new SafePromise("loadColumnAsync", (resolve) => {
      this.loadColumn(() => {
        resolve(true);
      });
    }).run();
  }

  unLoadColumn(onDone: (done: boolean) => void) {
    const location = this.getLocation();
    if (
      WorldLock.isLocked(location) ||
      !WorldRegister.instance.column.get(location)
    )
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
    return new SafePromise("loadRegionHeaderAsync", (resolve) => {
      this.loadRegionHeader((anaswer) => {
        resolve(anaswer);
      });
    }).run();
  }

  columnExistsAsync(): Promise<boolean> {
    return new SafePromise("columnExistsAsync", (resolve) => {
      this.columnExists((anaswer) => {
        resolve(anaswer);
      });
    }).run();
  }

  columnTimestamp(onDone?: (timestamp: number) => void) {
    const location = this.getLocation();
    this.dataComm.runPromiseTasks("column-timestamp", location, [], (data) => {
      onDone ? onDone(data) : false;
    });
  }

  columnTimestampAsync(): Promise<number> {
    return new SafePromise("columnTimestampAsync", (resolve) => {
      this.columnTimestamp((timeStamp) => {
        resolve(timeStamp);
      });
    }).run();
  }

  unLoadAllOutsideRadius(
    radius: number,
    run: (column: ColumnDataTool) => boolean = (columntool) => true,
    onDone?: Function
  ) {
    const [dimensionId, sx, sy, sz] = this.getLocation();

    let totalColumns = 0;
    let columnCount = 0;

    const dimension = WorldRegister.instance.dimensions.get(dimensionId);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const location = WorldRegister.instance.columnTool.getLocationData();
        const distnace = Distance3D(location[1], 0, location[3], sx, 0, sz);
        if (distnace > radius) {
          DataLoaderTool.columnDataTool.setColumn(column);
          if (!run(DataLoaderTool.columnDataTool)) return;
          this.setXYZ(location[1], 0, location[3]).unLoadColumn(() => {
            totalColumns--;
          });
        }
      });
    });

    const inte = new SafeInterval().setInterval(1).setOnRun(() => {
      if (totalColumns == 0) {
        inte.stop();
        if (onDone) onDone();
      }
    });
    inte.start();
  }
  unLoadAllColumnsAsync() {
    return new SafePromise("unLoadAllColumnsAsync", (resolve) => {
      this.unLoadAllColumns(() => {
        resolve(true);
      });
    }).run();
  }
  unLoadAllColumns(onDone?: Function) {
    const [dimension, sx, sy, sz] = this.location;
    const dim = WorldRegister.instance.dimensions.get(dimension);
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
    const dim = WorldRegister.instance.dimensions.get(dimension);
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
    const dim = WorldRegister.instance.dimensions.get(dimension);
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
